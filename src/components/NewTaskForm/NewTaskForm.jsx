// import { useState } from "react";
import { Component } from "react";
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.title.trim() !== '') {
      this.props.onKeyDown(this.state.title.trim());
      this.setState({ title: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          onKeyDown={this.handleKeyDown}
          value={this.state.title}
          onChange={this.handleChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired, 
};


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