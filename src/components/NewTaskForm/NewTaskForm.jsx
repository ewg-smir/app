import React, { useState } from "react";
import './NewTaskForm.css';
import PropTypes from 'prop-types';

function NewTaskForm({ onKeyDown }) {
  const [name, setName] = useState('');
  const [sec, setSec] = useState('');
  const [min, setMin] = useState('');


  const handleKeyDown = ({ code }) => {
    if (code === 'Enter' && name.trim() !== '') {
      const seconds = Number(sec) || 0;
      const minutes = Number(min)  * 60 || 0;

      if (seconds >= 0 || minutes >= 0) {
        onKeyDown({
          name: name.trim(),
          sec: seconds + minutes,
        });
        setName('');
        setMin('');
        setSec('');
      }
    }
  };

  const handleSecChange = ({ target: { value } }) => {
    if (/^\d*$/.test(value)) {
      setSec(value);
    }
  };

  const handleMinChange = ({ target: { value } }) => {
    if (/^\d*$/.test(value)) {
      setMin(value);
    }
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input
          onKeyDown={handleKeyDown}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="new-todo"
          placeholder="Task"
        />
        <input
          onKeyDown={handleKeyDown}
          value={min}
          onChange={handleMinChange}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          onKeyDown={handleKeyDown}
          value={sec}
          onChange={handleSecChange}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
      </form>
    </header>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
};
