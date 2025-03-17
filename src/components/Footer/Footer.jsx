import React, { Component } from "react";
import './Footer.css';
import { Filter } from "../Filter/Filter ";

export class Footer extends Component {
  handleClearCompleted = () => {
    const { onClearCompleted } = this.props; 
    onClearCompleted(); 
  };

  render() {
    const { itemsCount, categoryId, setCategoryId } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{itemsCount} items left</span>
        <Filter
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <button onClick={this.handleClearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}


// export const Footer = ({ itemsCount, onChangeTasks, categoryId, setCategoryId }) => {

//   const handleClearCompleted = () => {
//     onChangeTasks((prev) => prev.filter((task) => !task.done));
//   }

//   return (
//     <footer className="footer">
//       <span className="todo-count">{itemsCount} items left</span>
//       <Filter onChangeTasks={onChangeTasks} value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
//       <button onClick={handleClearCompleted} className="clear-completed">Clear completed</button>
//     </footer>
//   )
// } 