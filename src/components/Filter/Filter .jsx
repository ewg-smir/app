import React from "react";
import './Filter .css';

export const Filter = ( { value, onClickCategory } ) => {
  const categories = ['All', 'Active', 'Completed'];

  return (
    <ul class="filters">
      {categories.map((categoryName, index) => 
      <li key={index} onClick={() => onClickCategory(index)} ><button className={value === index ? 'selected' : ''} >{categoryName}</button></li>
      )}
        </ul>
  )
}