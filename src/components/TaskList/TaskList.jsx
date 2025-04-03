
import './TaskList.css';
import React, { useContext, useMemo } from 'react';
import Task from "../Task/Task";
import AppContext from "../../context/AppContext";

function TaskList() {
  const { tasks, categoryId } = useContext(AppContext);

  const filteredTasks = useMemo(() => tasks.filter(task =>
    (categoryId === 'Active' && !task.done) ||
    (categoryId === 'Completed' && task.done) ||
    categoryId === 'All'
  ), [tasks, categoryId]);
  console.log({ filteredTasks, categoryId, tasks })
  return (
    <ul className="todo-list">
      {filteredTasks.map((taskValue) => (
        <Task key={taskValue.id} value={taskValue} />
      ))}
    </ul>
  );
}

export default TaskList;
