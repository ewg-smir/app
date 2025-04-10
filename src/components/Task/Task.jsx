import React, { useState, useContext, useRef, useEffect } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from "../Timer/Timer";
import AppContext from "../../context/AppContext";

function Task({ value: { createdAt, id: taskIndex, title, done: isDone, isActive, remainingTime, sec } }) {
  const { handleDeleteTask, toggleTaskActive, updateTaskTime, updateTaskTitle, toggleTaskDone } = useContext(AppContext);
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
      console.log({ editValue })
      const newRemainingTime = Number(sec) * 1000 || remainingTime;
      setEditValue(e.target.value);
      updateTaskTitle({ updatedTitle: editValue, id: taskIndex })
      updateTaskTime(taskIndex, newRemainingTime);
      setEditActive(false);
    }
  };

  const handleTaskDone = (e) => {
    toggleTaskDone(taskIndex, e.target.checked);
  }


  let className = '';
  if (editActive) {
    className = 'editing';
  } else if (isDone) {
    className = 'completed';
  }

  useEffect(() => {
    if (editActive) {
      inputRef.current?.focus(); // Фокус на поле ввода
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
            <Timer
              done={isDone}
              taskIndex={taskIndex}
              isActive={isActive}
              duration={remainingTime}
              updateTaskTime={updateTaskTime}
              toggleTaskActive={toggleTaskActive}

            />
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
