import { Component } from "react";
import './TaskList.css';
import { Task } from "../Task/Task";
import PropTypes from 'prop-types'; 

export class TaskList extends Component {
  render() {
    const { tasks, categoryId, setCategoryId, onDelete, onUpdateTask } = this.props;

    return (
      <ul className="todo-list">
        {tasks
          .filter((task) => {
            if (categoryId === 1) return task.done === false;
            if (categoryId === 2) return task.done === true;
            return true;
          })
          .map((taskValue) => (
            <Task
              key={taskValue.id}
              setCategoryId={setCategoryId}
              onDelete={onDelete}
              onUpdateTask={onUpdateTask} 
              value={taskValue}
            />
          ))}
      </ul>
    );
  }
}


TaskList.propTypes = {
  tasks: PropTypes.array.isRequired, 
  categoryId: PropTypes.number.isRequired, 
  setCategoryId: PropTypes.func.isRequired, 
  onDelete: PropTypes.func.isRequired, 
  onUpdateTask: PropTypes.func.isRequired, 
};



// export const TaskList = ({ tasks, onChangeTasks, onDelete, categoryId, setCategoryId }) => {
//   return (
//     <ul className="todo-list">
//       {
//         tasks.filter((task) => {
//           if (categoryId === 1) {
//             return task.done === false;
//           }
//           if (categoryId === 2) {
//             return task.done === true;
//           }
//           else {
//             return true;
//           }
//         }

//         )
//           .map((taskValue) => {
//             return <Task setCategoryId={setCategoryId} key={taskValue.id} onDelete={onDelete} onChangeTasks={onChangeTasks} value={taskValue} />
//           }
//           )}
//     </ul>
//   )
// } 