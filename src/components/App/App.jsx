// import { useState } from "react";
import React, { Component } from "react";
import "./App.css";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Footer } from "../Footer/Footer";
import { TaskList } from "../TaskList/TaskList";


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // Initialize tasks as an empty array
      taskId: 0,
      categoryId: 0,
    };
  }

  handleDeleteTask = (todoId) => {
    this.setState((prevState) => {
      console.log("Tasks before deletion:", prevState.tasks); // Debugging
      return {
        tasks: prevState.tasks.filter((task) => task.id !== todoId),
      };
    });
  };

  handleKeyDown = (title) => {
    const { tasks, taskId } = this.state;
    console.log("Current tasks:", tasks); // Debugging

    this.setState({
      tasks: [
        ...tasks,
        {
          title: title,
          createdAt: new Date(),
          id: taskId,
          done: false,
        },
      ],
      taskId: taskId + 1,
    });
  };

  setCategoryId = (categoryId) => {
    this.setState({ categoryId });
  };

  setTasks = (newTasks) => {
    console.log("New tasks:", newTasks); // Debugging
    this.setState({ tasks: Array.isArray(newTasks) ? newTasks : [] });
  };

  render() {
    const { tasks, categoryId } = this.state;
    console.log("Tasks in render:", tasks); // Debugging
    const itemsCount = Array.isArray(tasks) ? tasks.filter((task) => !task.done).length : 0;

    return (
      <section className="todoapp">
        <NewTaskForm onKeyDown={this.handleKeyDown} />
        <TaskList
          tasks={Array.isArray(tasks) ? tasks : []} // Ensure tasks is always an array
          onChangeTasks={this.setTasks}
          onDelete={this.handleDeleteTask}
          categoryId={categoryId}
          setCategoryId={this.setCategoryId}
        />
        <section className="main">
          <Footer
            itemsCount={itemsCount}
            categoryId={categoryId}
            setCategoryId={this.setCategoryId}
            onChangeTasks={this.setTasks}
          />
        </section>
      </section>
    );
  }
}


// export const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [taskId, setTaskId] = useState(0);
//   const [categoryId, setCategoryId] = useState(0);


//   const itemsCount = tasks.filter((task) => !task.done).length;

//   const handleDeleteTask = (todoId) => {
//     setTasks((prev) => prev.filter((task) => task.id !== todoId));
//   }

//   const handleKeyDown = (title) => {

//     setTasks((prev) => [...prev,
//     {
//       title: title,
//       createdAt: new Date(),
//       id: taskId,
//       done: false
//     }]);
//     setTaskId((prev) => prev + 1);
//   }

//   return (
//     <section className="todoapp">
//       <NewTaskForm onKeyDown={handleKeyDown} />
//       <TaskList itemsCount={itemsCount} categoryId={categoryId} setCategoryId={setCategoryId} onDelete={handleDeleteTask} onChangeTasks={setTasks} tasks={tasks} />
//       <section className="main">
//         <Footer itemsCount={itemsCount} categoryId={categoryId} setCategoryId={setCategoryId} onChangeTasks={setTasks} />
//       </section>
//     </section>
//   )
// }