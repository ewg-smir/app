// import { useState } from "react";
import { Component } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types'; 


export class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      editValue: this.props.value.title,
    };
  }

  handleEditValue = (e) => {
    this.setState({ editValue: e.target.value });
  };

  handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { editValue } = this.state;
      const { value, onUpdateTask } = this.props;

      const updatedTask = { ...value, title: editValue, createdAt: new Date() };
      onUpdateTask(updatedTask); 

      this.setState({ editActive: false });
    }
  };

  handleCompletedActive = (e) => {
    const { value, onUpdateTask } = this.props;
    const updatedTask = { ...value, done: e.target.checked };
    onUpdateTask(updatedTask); 
  };

  render() {
    const { value, onDelete } = this.props;
    const { editActive, editValue } = this.state;

    const result = formatDistanceToNow(new Date(value.createdAt), {
      addSuffix: true,
      includeSeconds: true,
    });

    return (
      <li className={editActive ? 'editing' : value.done ? 'completed' : ''}>
        <div className="view">
          <input
            checked={value.done}
            onChange={this.handleCompletedActive}
            className="toggle"
            type="checkbox"
          />
          <label>
            <span className="description">{value.title}</span>
            <span className="created">{result}</span>
          </label>
          <button
            onClick={() => this.setState({ editActive: !editActive })}
            className="icon icon-edit"
          ></button>
          <button onClick={() => onDelete(value.id)} className="icon icon-destroy"></button>
        </div>
        {editActive && (
          <input
            type="text"
            className="edit"
            value={editValue}
            onChange={this.handleEditValue}
            onKeyDown={this.handleEditKeyDown}
          />
        )}
      </li>
    );
  }
}

Task.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    title: PropTypes.string.isRequired, 
    createdAt: PropTypes.string.isRequired, 
    done: PropTypes.bool.isRequired, 
  }).isRequired,
  onDelete: PropTypes.func.isRequired, 
  onUpdateTask: PropTypes.func.isRequired, 
};




// export const Task = ({ value: { createdAt, id: taskIndex, title, done }, onChangeTasks, onDelete }) => {

//   const [editActive, setEditActive] = useState(false);
//   const [editValue, setEditValue] = useState(title);

//   const handleEditValue = (e) => {
//     setEditValue(e.target.value);
//   }

//   const result = formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true, });

//   const handleEditKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       onChangeTasks((prev) => {
//         const resEdit = prev.map((item, i) => {
//           if (i === taskIndex) {

//             return { title: editValue, createdAt: new Date() };
//           }
//           return item;
//         })
//         return resEdit;
//       })
//       setEditActive(false);
//     }
//   }

//   const handleCompletedActive = (e) => {
//     onChangeTasks((prev) => {
//       return prev.map((task) => {
//         if (task.id === taskIndex) {
//           return { ...task, done: e.target.checked };
//         }
//         else {
//           return task;
//         }
//       })
//     })
//   }
//   return (
//     <>
//       <li className=
//         {editActive ? 'editing' : done ? 'completed' : ''}
//         key={taskIndex}
//       >
//         <div className="view">
//           <input checked={done} onClick={(e) => handleCompletedActive(e)} className="toggle" type="checkbox" />
//           <label>
//             <span className="description">{title}</span>
//             <span className="created"> {result} </span>
//           </label>
//           <button onClick={() => setEditActive((prev) => !prev)} className="icon icon-edit" ></button>
//           <button onClick={() => onDelete(taskIndex)} className="icon icon-destroy"></button>
//         </div>
//         <input type="text" className="edit" value={editValue} onChange={(e) => handleEditValue(e)} onKeyDown={handleEditKeyDown} />
//       </li>
//     </>
//   )
// }