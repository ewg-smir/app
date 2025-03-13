import React from "react";
import './NewTaskForm.css';

export const NewTaskForm = ({ value, onChange, onKeyDown }) => {

  return (
    <header class="header">
      <h1>Todos</h1>
      <input onKeyDown={onKeyDown} value={value} onChange={onChange} class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  )
}