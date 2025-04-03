import React, { useContext } from 'react';
import './Filter .css';
import AppContext from "../../context/AppContext";

const CATEGORIES = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Active' },
  { id: 2, name: 'Completed' }
];


function Filter() {

  const { categoryId, setCategoryId } = useContext(AppContext);

  // const handleCategoryChange = (category) => {
  //   setCategoryId(category); 
  // };

  return (
    <ul className="filters">
      {CATEGORIES.map((category) =>
        <li key={category.id} ><button type='submit' className={categoryId === category.id ? 'selected' : ''}   onClick={() => setCategoryId(category.id)} >{category.name}</button></li>
      )}
    </ul>
  )
}

export default Filter;
