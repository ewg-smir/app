
import './Footer.css';
import { Filter } from "../Filter/Filter ";

export const Footer = ({ itemsCount, onChangeTasks, categoryId, setCategoryId }) => {

  const handleClearCompleted = () => {
    onChangeTasks((prev) => prev.filter((task) => !task.done));
  }

  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left</span>
      <Filter onChangeTasks={onChangeTasks} value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
      <button onClick={handleClearCompleted} className="clear-completed">Clear completed</button>
    </footer>
  )
} 