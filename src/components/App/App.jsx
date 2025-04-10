import React, { useState, useMemo, useCallback } from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import TaskList from "../TaskList/TaskList";
import AppContext from "../../context/AppContext";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [categoryId, setCategoryId] = useState('All');

  const itemsCount = tasks.filter((task) => !task.done).length;

  const handleDeleteTask = useCallback((todoId) => {
    setTasks((prev) => prev.filter((task) => task.id !== todoId));
  }, []);

  const handleKeyDown = ({ name, sec }) => {
    setTasks((prev) => [
      ...prev,
      {
        title: name,
        createdAt: new Date(),
        id: taskId,
        done: false,
        sec: Number(sec) || 0,
        isActive: true,
        remainingTime: ( Number(sec)) * 1000 || 0
      },
    ]);
    setTaskId((prev) => prev + 1);
  };

const updateTaskTitle = useCallback(({updatedTitle, id}) => {
setTasks((prev) => prev.map((item) => {
  if(item.id === id ){
    return {
      ...item,
      title:updatedTitle
    }
  }
  return item;
})
)}, [])

  const updateTaskTime = useCallback((id, remainingTime) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? {
        ...task,
        remainingTime,
        sec: Math.floor(remainingTime / 1000),
      } : task
    ));
  }, []);

  const toggleTaskActive = useCallback((id, isActive) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, isActive } : task
    ));
  }, []);

  const toggleTaskDone = useCallback((id, done) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, done } : task
    ));
  }, []);

  const contextValue = useMemo(
    () => ({
      itemsCount,
      categoryId,
      setCategoryId,
      handleDeleteTask,
      setTasks,
      tasks,
      updateTaskTime,
      toggleTaskActive,
      updateTaskTitle,
      toggleTaskDone
    }),
    [itemsCount, categoryId, handleDeleteTask, tasks, updateTaskTime, toggleTaskActive, updateTaskTitle, toggleTaskDone]
  );
  console.log({tasks})
  return (
    <section className="todoapp">
      <AppContext.Provider value={contextValue}>
        <NewTaskForm onKeyDown={handleKeyDown} />
        <TaskList />
        <section className="main">
          <Footer />
        </section>
      </AppContext.Provider>
    </section>
  );
}

export default App;