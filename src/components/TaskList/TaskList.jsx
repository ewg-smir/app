import React, { useContext, useMemo } from 'react';
import './TaskList.css';
import Task from "../Task/Task";
import AppContext from "../../context/AppContext";

function TaskList() {
  const { tasks, categoryId } = useContext(AppContext);

  const filteredTasks = useMemo(() => tasks.filter(task =>
    (categoryId === 'Active' && !task.done) ||
    (categoryId === 'Completed' && task.done) ||
    categoryId === 'All'
  ), [tasks, categoryId]);

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => (
        <Task key={task.id} value={task} />
      ))}
    </ul>
  );
}

export default TaskList;