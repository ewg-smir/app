import  { useState } from "react";
import './Footer.css';
import { Filter } from "../Filter/Filter ";

export const Footer = () => {
  const [categoryId, setCategoryId] = useState(0);
  return (
    <footer className="footer">
        <span className="todo-count">1 items left</span>
        <Filter value ={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <button className="clear-completed">Clear completed</button>
      </footer>
  )
} 