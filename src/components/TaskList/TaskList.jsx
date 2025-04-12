import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from "../Task/Task";


function TaskList({ data }) {

  return (
    <ul className="todo-list">
      {data.map((task) => (
        <Task key={task.id} value={task} />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default TaskList;