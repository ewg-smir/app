import { useState } from "react";
import './NewTaskForm.css';
import PropTypes from 'prop-types';
import { Timer } from "../Timer/Timer";


export const NewTaskForm = ({ onKeyDown }) => {
  const [name, setName] = useState('');

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' && name.trim() !== '') {
      onKeyDown(name.trim());
      setName('');
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <input onKeyDown={handleKeyDown} value={name} onChange={(e) => setName(e.target.value)} className="new-todo" placeholder="What needs to be done?" />
      <Timer />
    </header>
  )
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired, 
};