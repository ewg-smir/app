import React, { useState } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export const Task = ({ value:{value, createdAt}, onChangeTasks, taskIndex }) => {

  const [destroyActive, setDestroyActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [completedActive, setCompletedActive] = useState(false);
  const [editValue, setEditValue] = useState({value});

const handleEditValue = (e) => {
  setEditValue( e.target.value);
}

const result = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true, });

const handleEditKeyDown = (e) => {
  if (e.key === 'Enter'){
    onChangeTasks((prev) => {
      const resEdit =  prev.map((item, i) => {
        if(i === taskIndex){
          
          return {value: editValue, createdAt: new Date() };
        }
        return item;
      })
      return resEdit;
    })
    setEditActive(false);
  }
  
}
console.log(result, createdAt);
  return (
    <>
    <li className=
    {destroyActive ? 'edit' : editActive ? 'editing' : completedActive ? 'completed' : ''}
    key={taskIndex}
    >
          <div class="view">
            <input onClick={() => setCompletedActive((prev) => !prev)} class="toggle" type="checkbox" />
            <label>
              <span class="description">{ value }</span>
              <span class="created"> {result} </span>
            </label>
            <button onClick={() => setEditActive((prev) => !prev)} class="icon icon-edit" ></button>
            <button onClick={() => setDestroyActive((prev) => !prev)} class="icon icon-destroy"></button>
          </div>
          <input type="text" class="edit" value={ editValue.value } onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
        </li>
    {/* <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>
              <span class="description">{value}</span>
              <span class="created">created 17 seconds ago</span>
            </label>
            <button class="icon icon-edit"></button>
            <button class="icon icon-destroy"></button>
          </div>
        </li>
        <li class="editing">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>
              <span class="description">Editing task</span>
              <span class="created">created 5 minutes ago</span>
            </label>
            <button class="icon icon-edit"></button>
            <button class="icon icon-destroy"></button>
          </div>
          <input type="text" class="edit" value="Editing task" />
        </li>
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>
              <span class="description">Active task</span>
              <span class="created">created 5 minutes ago</span>
            </label>
            <button class="icon icon-edit"></button>
            <button class="icon icon-destroy"></button>
          </div>
        </li> */}
        </>
  )
}