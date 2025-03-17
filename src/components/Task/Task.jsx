// import { useState } from "react";
import React, { Component } from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';


export class Task extends Component {
  constructor(props) {
    super(props);
    const { value: { title } } = props;

    this.state = {
      editActive: false,
      editValue: title, 
    };
  }

  handleEditValue = (e) => {
    this.setState({ editValue: e.target.value });
  };

  handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { onChangeTasks, value: { id: taskIndex } } = this.props;
      const { editValue } = this.state;

      onChangeTasks((prev) => {
        const resEdit = prev.map((item, i) => {
          if (i === taskIndex) {
            return { ...item, title: editValue, createdAt: new Date() };
          }
          return item;
        });
        return resEdit;
      });

      this.setState({ editActive: false });
    }
  };

  handleCompletedActive = (e) => {
    const { onChangeTasks, value: { id: taskIndex } } = this.props;

    onChangeTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskIndex) {
          return { ...task, done: e.target.checked };
        }
        return task;
      });
    });
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      editActive: !prevState.editActive,
    }));
  };

  render() {
    const { value: { createdAt, id: taskIndex, title, done }, onDelete } = this.props;
    const { editActive, editValue } = this.state;

    const result = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
      includeSeconds: true,
    });

    return (
      <li
        className={editActive ? 'editing' : done ? 'completed' : ''}
        key={taskIndex}
      >
        <div className="view">
          <input
            checked={done}
            onChange={this.handleCompletedActive}
            className="toggle"
            type="checkbox"
          />
          <label>
            <span className="description">{title}</span>
            <span className="created"> {result} </span>
          </label>
          <button onClick={this.toggleEdit} className="icon icon-edit"></button>
          <button
            onClick={() => onDelete(taskIndex)}
            className="icon icon-destroy"
          ></button>
        </div>
        <input
          type="text"
          className="edit"
          value={editValue}
          onChange={this.handleEditValue}
          onKeyDown={this.handleEditKeyDown}
        />
      </li>
    );
  }
}


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