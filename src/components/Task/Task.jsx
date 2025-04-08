import React, { useState, useContext, useRef, useEffect } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from "../Timer/Timer";
import AppContext from "../../context/AppContext";

function Task({ value: { createdAt, id: taskIndex, title, done, sec, min, isActive } }) {

  const { handleDeleteTask, setTasks } = useContext(AppContext);

  const [editActive, setEditActive] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef(null);
  const taskRef = useRef(null);

  const handleEditValue = (e) => setEditValue(e.target.value);

  const result = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true, });

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      setTasks((prev) =>
        prev.map((item) => {
          if (item.id === taskIndex) {
            return {
              ...item,
              title: editValue,
              createdAt: new Date(),
              sec: Number(sec),
              min: Number(min),
            };
          }
          return item;
        })
      );
      setEditActive(false);
    }
  }

  const handleCompletedActive = (e) => setTasks((prev) =>
    prev.map((task) => (task.id === taskIndex ? { ...task, done: e.target.checked } : task
    ))
  )

  let className = '';
  if (editActive) {
    className = 'editing';
  } else if (done) {
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
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [editActive, title]);

  return (
    <li className={className} ref={taskRef}>
      <div className="view">
        <input id={`task-checkbox-${taskIndex}`} checked={done} onClick={(e) => handleCompletedActive(e)} className="toggle" type="checkbox" />
        <label htmlFor={`task-checkbox-${taskIndex}`}>
          <span className="title">{title}</span>
          <span className="description">
            <Timer done={done} taskIndex={taskIndex} setTasks={setTasks} isActive={isActive} duration={(min * 60 * 1000) + (sec * 1000)} />
          </span>
          <span className="description"> {result} </span>
        </label>
        <button aria-label="Edit task" onClick={() => setEditActive((prev) => !prev)} className="icon icon-edit" type="submit" />
        <button aria-label="Delete task" onClick={() => handleDeleteTask(taskIndex)} className="icon icon-destroy" type="submit" />
      </div>
      <input ref={inputRef} type="text" className="edit" value={editValue} onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
    </li>
  )
}

export default Task;


Task.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    sec: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
};
