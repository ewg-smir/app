import React, { useContext } from 'react';
import './Footer.css';
import Filter from "../Filter/Filter ";
import  AppContext  from "../../context/AppContext";

function Footer() {

  const { itemsCount, setTasks } = useContext(AppContext);

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  }

  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left</span>
      <Filter />
      <button onClick={handleClearCompleted} className="clear-completed" type='submit'>Clear completed</button>
    </footer>
  )
}

export default Footer;
