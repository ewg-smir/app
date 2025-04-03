import { createContext } from "react";

const AppContext = createContext({
  tasks: [],
  setTasks: () => {},
  categoryId: 0,
  setCategoryId: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleClearCompleted: () => {},
  handleUpdateTask: () => {},
});

export default AppContext;