
import './TaskList.css';
import { Task } from "../Task/Task";

export const TaskList = ({ tasks, onChangeTasks, onDelete }) => {

  return (
    <ul className="todo-list">
      {
        tasks.map((taskValue) => { return <Task key={taskValue.id} onDelete={onDelete} onChangeTasks={onChangeTasks} value={taskValue.title} taskIndex={taskValue.id} createdAt={taskValue.createdAt} /> }
        )}
    </ul>
  )
} 