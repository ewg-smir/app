import { useState } from "react";
import "./App.css";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Footer } from "../Footer/Footer";
import { TaskList } from "../TaskList/TaskList";



export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);


  const itemsCount = tasks.filter((task) => !task.done).length;

  const handleDeleteTask = (todoId) => {
    setTasks((prev) => prev.filter((task) => task.id !== todoId));
  }


  const handleKeyDown = ({ name, sec, min }) => {

    setTasks((prev) => [...prev,
    {
      title: name,
      sec: Number(sec),
      min: Number(min),
      createdAt: new Date(),
      id: taskId,
      done: false,
      isActive: true
    }]);
    setTaskId((prev) => prev + 1);
  }

console.log({tasks})


  return (
    <section className="todoapp">
      <NewTaskForm onKeyDown={handleKeyDown} />
      <TaskList itemsCount={itemsCount} categoryId={categoryId} setCategoryId={setCategoryId} onDelete={handleDeleteTask} onChangeTasks={setTasks} tasks={tasks} />
      <section className="main">
        <Footer itemsCount={itemsCount} categoryId={categoryId} setCategoryId={setCategoryId} onChangeTasks={setTasks} />
      </section>
    </section>
  )
}