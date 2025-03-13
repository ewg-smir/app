import React from "react";
import './TaskList.css';
import { Task } from "../Task/Task";

export const TaskList = ({tasks, onChangeTasks}) => {

  return (
    <ul class="todo-list">
      {
        tasks.map((taskValue, index) => 
          
          { return <Task onChangeTasks={onChangeTasks} value={taskValue} taskIndex={index}/>}
        )}
      </ul>
  )
} 