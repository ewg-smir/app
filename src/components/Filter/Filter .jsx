import React, { useContext } from 'react';
import './Filter .css';
import AppContext from "../../context/AppContext";


function Filter() {
  const categories = ['All', 'Active', 'Completed'];

  const { categoryId, setCategoryId } = useContext(AppContext);

  const handleCategoryChange = (category) => {
    setCategoryId(category); 
  };

  return (
    <ul className="filters">
      {categories.map((categoryName) =>
        <li key={categoryName} ><button type='submit' className={categoryId === categories.indexOf(categoryName) ? 'selected' : ''}  onClick={() => handleCategoryChange(categoryName)} >{categoryName}</button></li>
      )}
    </ul>
  )
}

export default Filter;
