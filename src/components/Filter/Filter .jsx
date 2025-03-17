import React, { Component } from "react";
import './Filter .css';

export class Filter extends Component {
  render() {
    const { value, onClickCategory } = this.props;
    const categories = ['All', 'Active', 'Completed'];

    return (
      <ul className="filters">
        {categories.map((categoryName, index) => (
          <li key={index} onClick={() => onClickCategory(index)}>
            <button className={value === index ? 'selected' : ''}>
              {categoryName}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}



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