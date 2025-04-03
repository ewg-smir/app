import React, { useState } from "react";
import './NewTaskForm.css';
import PropTypes from 'prop-types';


function NewTaskForm({ onKeyDown }) {
  const [name, setName] = useState('');
  const [sec, setSec] = useState('');
  const [min, setMin] = useState('');


  const handleKeyDown = (e) => {
    if (e.code === 'Enter' && name.trim() !== '') {
      onKeyDown({
        name: name.trim(),
        min,
        sec
      });
      setName('');
      setMin('');
      setSec('');
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input onKeyDown={handleKeyDown} value={name} onChange={(e) => setName(e.target.value)} className="new-todo" placeholder="Task" />
        <input onKeyDown={handleKeyDown} value={min} onChange={(e) => setMin(e.target.value)} className="new-todo-form__timer" placeholder="Min" />
        <input onKeyDown={handleKeyDown} value={sec} onChange={(e) => setSec(e.target.value)} className="new-todo-form__timer" placeholder="Sec" />
      </form>
    </header>
  )
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};