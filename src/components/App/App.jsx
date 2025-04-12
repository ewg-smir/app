import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import TaskList from "../TaskList/TaskList";
import AppContext from "../../context/AppContext";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [categoryId, setCategoryId] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      const newArr = tasks.map((el) => {
        if (el.sec === 0) {
          return el;
        }

        if (el.isActive) {
          return { ...el, sec: el.sec - 1 }
        }

        return el;
      });

      setTasks(newArr);
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);


  const filterTasks = (items, filterParam) => {
    switch (filterParam) {
      case 'All':
        return items;
      case 'Completed':
        return items.filter((e) => e.done);
      case 'Active':
        return items.filter((e) => !e.done);
      default:
        return items;
    }
  };



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
      },
    ]);
    setTaskId((prev) => prev + 1);
  };

  const updateTaskTitle = useCallback(({ updatedTitle, id }) => {
    setTasks((prev) => prev.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: updatedTitle
        }
      }
      return item;
    })
    )
  }, [])

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
      toggleTaskActive,
      updateTaskTitle,
      toggleTaskDone
    }),
    [itemsCount, categoryId, handleDeleteTask, tasks, toggleTaskActive, updateTaskTitle, toggleTaskDone]
  );

  const filteredTasks = filterTasks(tasks, categoryId);

  return (
    <section className="todoapp">
      <AppContext.Provider value={contextValue}>
        <NewTaskForm onKeyDown={handleKeyDown} />
        <TaskList data={filteredTasks} />
        <section className="main">
          <Footer />
        </section>
      </AppContext.Provider>
    </section>
  );
}

export default App;