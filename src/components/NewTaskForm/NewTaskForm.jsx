// import { useState } from "react";
import React, { Component } from "react";
import './NewTaskForm.css';


export class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // Initialize name state
    };
  }

  handleKeyDown = (e) => {
    const { name } = this.state;
    const { onKeyDown } = this.props;

    if (e.code === 'Enter' && name.trim() !== '') {
      onKeyDown(name.trim()); // Pass the trimmed name to the parent component
      this.setState({ name: '' }); // Reset the input field
    }
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value }); // Update the state with the input value
  };

  render() {
    const { name } = this.state;

    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          onKeyDown={this.handleKeyDown}
          value={name}
          onChange={this.handleChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}


// export const NewTaskForm = ({ onKeyDown }) => {
//   const [name, setName] = useState('');

//   const handleKeyDown = (e) => {
//     if (e.code === 'Enter' && name.trim() !== '') {
//       onKeyDown(name.trim());
//       setName('');
//     }
//   }

//   return (
//     <header className="header">
//       <h1>Todos</h1>
//       <input onKeyDown={handleKeyDown} value={name} onChange={(e) => setName(e.target.value)} className="new-todo" placeholder="What needs to be done?" autoFocus />
//     </header>
//   )
// }