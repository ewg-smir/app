import React from "react";
import './TaskList.css';
import { Task } from "../Task/Task";

export const TaskList = ({ tasks, onChangeTasks, onDelete }) => {

  return (
    <ul class="todo-list">
      {
        tasks.map((taskValue) => { return <Task onDelete={onDelete} onChangeTasks={onChangeTasks} value={taskValue.title} taskIndex={taskValue.id} createdAt = {taskValue.createdAt} /> }
        )}
    </ul>
  )
} 