import React, { useState } from "react";
import "./App.css";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Footer } from "../Footer/Footer";
import { TaskList } from "../TaskList/TaskList";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);


  // const handleChangeValue = (e) => {
  //   setSearchValue(e.target.value);
  // }

  const handleDeleteTask = (todoId) => {
    setTasks((prev) => prev.filter((task) => task.id !== todoId))
  }

  const handleKeyDown = (title) => {

    setTasks((prev) => [...prev,
    {
      title: title,
      createdAt: new Date(),
      id: taskId,
      done: false
    }]);
    setTaskId((prev) => prev + 1);

  }
  console.log(tasks)


  return (
    <section class="todoapp">
      <NewTaskForm onKeyDown={handleKeyDown} />
      <TaskList onDelete={handleDeleteTask} onChangeTasks={setTasks} tasks={tasks} />
      <section class="main">
        <Footer />
      </section>
    </section>
  )
}