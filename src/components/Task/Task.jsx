import { useState } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types'; 



export const Task = ({ value: { createdAt, id: taskIndex, title, done }, onChangeTasks, onDelete }) => {

  const [editActive, setEditActive] = useState(false);
  const [editValue, setEditValue] = useState(title);

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

  const handleCompletedActive = (e) => {
    onChangeTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskIndex) {
          return { ...task, done: e.target.checked };
        }
        else {
          return task;
        }
      })
    })
  }
  return (
    <>
      <li className=
        {editActive ? 'editing' : done ? 'completed' : ''}
        key={taskIndex}
      >
        <div className="view">
          <input checked={done} onClick={(e) => handleCompletedActive(e)} className="toggle" type="checkbox" />
          <label>
            <span className="description">{title}</span>
            <span className="created"> {result} </span>
          </label>
          <button onClick={() => setEditActive((prev) => !prev)} className="icon icon-edit" ></button>
          <button onClick={() => onDelete(taskIndex)} className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" value={editValue} onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
      </li>
    </>
  )
}


Task.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    title: PropTypes.string.isRequired, 
    createdAt: PropTypes.string.isRequired, 
    done: PropTypes.bool.isRequired, 
  }).isRequired,
  onDelete: PropTypes.func.isRequired, 
  onUpdateTask: PropTypes.func.isRequired, 
};
