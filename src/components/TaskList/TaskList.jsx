import './TaskList.css';
import React, { useContext } from 'react';
import Task from "../Task/Task";
import AppContext from "../../context/AppContext";

function TaskList() {

  const { tasks, categoryId } = useContext(AppContext);

  return (
    <ul className="todo-list">
      {
        tasks.filter((task) => {
          if (categoryId === 'Active') {
            return task.done === false;
          }
          if (categoryId === 'Completed') {
            return task.done === true;
          }
          return true;
        })
          .map((taskValue) => (
            <Task key={taskValue.id} value={taskValue} />
          )
          )}
    </ul>
  )
}

export default TaskList;
