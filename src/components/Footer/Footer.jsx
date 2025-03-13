import React, { useState } from "react";
import './Footer.css';
import { Filter } from "../Filter/Filter ";

export const Footer = () => {
  const [categoryId, setCategoryId] = useState(0);
  return (
    <footer class="footer">
        <span class="todo-count">1 items left</span>
        <Filter value ={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <button class="clear-completed">Clear completed</button>
      </footer>
  )
} 