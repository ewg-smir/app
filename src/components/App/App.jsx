import React, { useState, useMemo, useCallback } from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import TaskList from "../TaskList/TaskList";

import  AppContext  from "../../context/AppContext";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);


  const itemsCount = tasks.filter((task) => !task.done).length;

  const handleDeleteTask = useCallback((todoId) => {
    setTasks((prev) => prev.filter((task) => task.id !== todoId));
  }, []);


  const handleKeyDown = ({ name,
    //  sec, min 
    }) => {

    setTasks((prev) => [...prev,
    {
      title: name,
      // sec: Number(sec),
      // min: Number(min),
      createdAt: new Date(),
      id: taskId,
      done: false,
      isActive: true
    }]);
    setTaskId((prev) => prev + 1);
  }

  const contextValue = useMemo(() => ({
    itemsCount,
    categoryId,
    setCategoryId,
    handleDeleteTask,
    setTasks,
    tasks,
  }), [itemsCount, categoryId, handleDeleteTask, setTasks, tasks]);

  return (
    <section className="todoapp">
      <AppContext.Provider value={ contextValue }>
        <NewTaskForm onKeyDown={handleKeyDown} />
        <TaskList />
        <section className="main">
          <Footer />
        </section>
      </AppContext.Provider>
    </section>
  )
}

export default App;