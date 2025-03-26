import React from 'react';
import './Filter .css';
import PropTypes from 'prop-types';



function Filter ( { value, onClickCategory } ) {
  const categories = ['All', 'Active', 'Completed'];
  
  return (
    <ul className="filters">
      {categories.map((categoryName, index) => 
      <li key={categoryName} ><button type='submit' className={value === categories.indexOf(categoryName) ? 'selected' : ''}   onClick={() => onClickCategory(index)} >{categoryName}</button></li>
      )}
        </ul>
  )
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.number.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

