import  { useState } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export const Task = ({ value, onChangeTasks, taskIndex, onDelete, createdAt }) => {

  const [editActive, setEditActive] = useState(false);
  const [completedActive, setCompletedActive] = useState(false);
  const [editValue, setEditValue] = useState({ value });

  const handleEditValue = (e) => {
    setEditValue(e.target.value);
  }

  const result = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true, });

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChangeTasks((prev) => {
        const resEdit = prev.map((item, i) => {
          if (i === taskIndex) {

            return { title: editValue, createdAt: new Date() };
          }
          return item;
        })
        return resEdit;
      })
      setEditActive(false);
    }

  }
  return (
    <>
      <li className=
        {editActive ? 'editing' : completedActive ? 'completed' : ''}
        key={taskIndex}
      >
        <div className="view">
          <input onClick={() => setCompletedActive((prev) => !prev)} className="toggle" type="checkbox" />
          <label>
            <span className="description">{value}</span>
            <span className="created"> {result} </span>
          </label>
          <button onClick={() => setEditActive((prev) => !prev)} className="icon icon-edit" ></button>
          <button onClick={() => onDelete(taskIndex)} className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" value={editValue.value} onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
      </li>
    </>
  )
}