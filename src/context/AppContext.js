import { createContext } from 'react';

const AppContext = createContext({
  tasks: [],
  setTasks: () => {},
  categoryId: 'All',
  setCategoryId: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleClearCompleted: () => {},
  handleUpdateTask: () => {},
});

export default AppContext;
