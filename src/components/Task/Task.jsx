import React, { useState } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from "../Timer/Timer";

function Task({ value: { createdAt, id: taskIndex, title, done, sec, min, isActive }, onChangeTasks, onDelete }) {

  const [editActive, setEditActive] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleEditValue = (e) => setEditValue(e.target.value);

  const result = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true, });

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChangeTasks((prev) => {
        const resEdit = prev.map((item, i) => {
          if (i === taskIndex) {
            return { ...item, title: editValue, createdAt: new Date(), sec: Number(sec), min: Number(min) };
          }
          return item;
        })
        return resEdit;
      })
      setEditActive(false);
    }
  }

  const handleCompletedActive = (e) => onChangeTasks((prev) =>
    prev.map((task) => (task.id === taskIndex ? { ...task, done: e.target.checked } : task
    ))
  )

  let className = '';
  if (editActive) {
    className = 'editing';
  } else if (done) {
    className = 'completed';
  }


  return (
    <li className={className}>
      <div className="view">
        <input id={`task-checkbox-${taskIndex}`} checked={done} onClick={(e) => handleCompletedActive(e)} className="toggle" type="checkbox" />
        <label htmlFor={`task-checkbox-${taskIndex}`}>
          <span className="title">{title}</span>
          <span className="description">
            <Timer done={done} taskIndex={taskIndex} onChangeTasks={onChangeTasks} isActive={isActive} duratuion={(min * 60 * 1000) + (sec * 1000)} />
          </span>
          <span className="description"> {result} </span>
        </label>
        <button aria-label="Edit task" onClick={() => setEditActive((prev) => !prev)} className="icon icon-edit" type="submit" />
        <button aria-label="Delete task" onClick={() => onDelete(taskIndex)} className="icon icon-destroy" type="submit" />
      </div>
      <input type="text" className="edit" value={editValue} onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
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
  onDelete: PropTypes.func.isRequired,
  onChangeTasks: PropTypes.func.isRequired,
};
