import { Component } from "react";
import './Filter .css';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { value, onClickCategory } = this.props;
    const categories = ['All', 'Active', 'Completed'];

    return (
      <ul className="filters">
        {categories.map((categoryName, index) => (
          <li key={index} >
            <button onClick={() => onClickCategory(index)} className={value === index ? 'selected' : ''}>
              {categoryName}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

Filter.propTypes = {
  value: PropTypes.number.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};


// export const Filter = ( { value, onClickCategory } ) => {
//   const categories = ['All', 'Active', 'Completed'];
  
//   return (
//     <ul className="filters">
//       {categories.map((categoryName, index) => 
//       <li key={index} onClick={() => onClickCategory(index)} ><button className={value === index ? 'selected' : ''} >{categoryName}</button></li>
//       )}
//         </ul>
//   )
// }