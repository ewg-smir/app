import { useState } from "react";
import "./App.css";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Footer } from "../Footer/Footer";
import { TaskList } from "../TaskList/TaskList";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);


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
    console.log('heloo')
  }

  return (
    <section className="todoapp">
      <NewTaskForm onKeyDown={handleKeyDown} />
      <TaskList onDelete={handleDeleteTask} onChangeTasks={setTasks} tasks={tasks} />
      <section className="main">
        <Footer />
      </section>
    </section>
  )
}