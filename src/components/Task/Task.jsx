import React, { useState, useContext, useRef, useEffect } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import AppContext from "../../context/AppContext";

function Task({ value: { createdAt, id: taskIndex, title, done: isDone, isActive, sec } }) {
  const { handleDeleteTask, toggleTaskActive, updateTaskTitle, toggleTaskDone } = useContext(AppContext);
  const [editActive, setEditActive] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef(null);
  const taskRef = useRef(null);

  const handleEditValue = (e) => setEditValue(e.target.value);

  const result = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    includeSeconds: true
  });

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditValue(e.target.value);
      updateTaskTitle({ updatedTitle: editValue, id: taskIndex })
      setEditActive(false);
    }
  };

  const handleTaskDone = (e) => {
    toggleTaskActive(taskIndex, !e.target.checked);
    toggleTaskDone(taskIndex, e.target.checked);
  }

  const getFormattedTime = () => {
    const totalMinutes = Math.floor(sec / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    let seconds = sec-(totalMinutes*60);
    let minutes = totalMinutes % 60;
    let hours = totalHours % 24;
    if (seconds < 10) seconds = `0${seconds}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;

    let timeString = `${minutes}:${seconds}`;

    if (totalDays > 0) {
      timeString = `${totalDays}d ${hours}:${timeString}`;
    } else if (totalHours > 0) {
      timeString = `${hours}:${timeString}`;
    }

    if (isDone || seconds === 0) {
      timeString = '00:00';
    }

    return timeString;
  };


  let className = '';
  if (editActive) {
    className = 'editing';
  } else if (isDone) {
    className = 'completed';
  }

  useEffect(() => {
    if (editActive) {
      inputRef.current?.focus();
    }
    const handleClickOutside = (event) => {
      if (editActive && taskRef.current && !taskRef.current.contains(event.target)) {
        setEditValue(title);
        setEditActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editActive, title]);
  return (
    <li className={className} ref={taskRef}>
      <div className="view">
        <input
          id={`task-checkbox-${taskIndex}`}
          checked={isDone}
          onChange={handleTaskDone}
          className="toggle"
          type="checkbox"
        />
        <label htmlFor={`task-checkbox-${taskIndex}`}>
          <span className="title">{title}</span>
          <span className="description">
            <button
              aria-label="Play Timer"
              className="icon icon-play"
              type="button"
              onClick={() => toggleTaskActive(taskIndex, true)}
              disabled={isDone || sec <= 0}
            />
            <button
              aria-label="Pause Timer"
              className="icon icon-pause"
              type="button"
              onClick={() => toggleTaskActive(taskIndex, false)}
              disabled={!isActive || isDone || sec <= 0}
            />
            <span>{getFormattedTime(sec)}</span>
          </span>
          <span className="description"> {result} </span>
        </label>
        <button type="button" aria-label="Edit task" onClick={() => setEditActive(true)} className="icon icon-edit" />
        <button type="button" aria-label="Delete task" onClick={() => handleDeleteTask(taskIndex)} className="icon icon-destroy" />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={editValue}
        onChange={handleEditValue}
        onKeyDown={handleEditKeyDown}
      />
    </li>
  );
}

Task.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    remainingTime: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
};

export default Task;