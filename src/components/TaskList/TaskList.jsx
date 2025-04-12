import React from 'react';
import './TaskList.css';
import Task from "../Task/Task";


function TaskList({ data }) {

  return (
    <ul className="todo-list">
      {data.map((task) => (
        <Task key={task.id} value={task} />
      ))}
    </ul>
  );
}

export default TaskList;