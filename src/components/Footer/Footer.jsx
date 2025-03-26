import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import  Filter  from "../Filter/Filter ";



function Footer ({ itemsCount, onChangeTasks, categoryId, setCategoryId }) {

  const handleClearCompleted = () => {
    onChangeTasks((prev) => prev.filter((task) => !task.done));
  }

  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left</span>
      <Filter onChangeTasks={onChangeTasks} value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
      <button onClick={handleClearCompleted} className="clear-completed" type='submit'>Clear completed</button>
    </footer>
  )
} 

export default Footer;

Footer.propTypes = {
  onChangeTasks: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  setCategoryId: PropTypes.func.isRequired,
};