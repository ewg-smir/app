import React, { useState } from "react";
import './NewTaskForm.css';

export const NewTaskForm = ({ value, onChange, onKeyDown }) => {
  const [name, setName] = useState('');

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' && name.trim() !== '') {
      onKeyDown(name.trim());
      setName('');
    }
  }

  return (
    <header class="header">
      <h1>Todos</h1>
      <input onKeyDown={handleKeyDown} value={name} onChange={(e) => setName(e.target.value)} class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  )
}