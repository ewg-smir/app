import React, {useState} from "react";
import "./App.css";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Footer } from "../Footer/Footer";
import { TaskList } from "../TaskList/TaskList";

export const App = () => {
  const [searchValue, setSearchValue] = useState( '' );    
  const [tasks, setTasks] = useState( [] ); 


  const handleChangeValue = (e) => {
    setSearchValue( e.target.value);
}

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.length > 0){
      setTasks ((prev) =>  [...prev, {value:e.target.value, createdAt: new Date()}]);
      setSearchValue('');
    }
}

  
  return (
    <section class="todoapp">
    <NewTaskForm  value={searchValue} onKeyDown={handleKeyDown} onChange={handleChangeValue}/>
    <TaskList onChangeTasks={setTasks} tasks={tasks} />
    <section class="main">
      <Footer />
    </section>
  </section>
  )
}