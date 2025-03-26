import './TaskList.css';
import React from 'react';
import PropTypes from 'prop-types';
import   Task  from "../Task/Task";


function TaskList ({ tasks, onChangeTasks, onDelete, categoryId, setCategoryId }) {
  return (
    <ul className="todo-list">
      {
        tasks.filter((task) => {
          if (categoryId === 1) {
            return task.done === false;
          }
          if (categoryId === 2) {
            return task.done === true;
          }
            return true;
        })
          .map((taskValue) => (
              <Task setCategoryId={setCategoryId} key={taskValue.id} onDelete={onDelete} onChangeTasks={onChangeTasks} value={taskValue} />
          )
          )}
    </ul>
  )
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  })).isRequired,
  categoryId: PropTypes.number.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  onChangeTasks: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

