import './Filter .css';
import PropTypes from 'prop-types';



export const Filter = ( { value, onClickCategory } ) => {
  const categories = ['All', 'Active', 'Completed'];
  
  return (
    <ul className="filters">
      {categories.map((categoryName, index) => 
      <li key={index} ><button className={value === index ? 'selected' : ''}  onClick={() => onClickCategory(index)} >{categoryName}</button></li>
      )}
        </ul>
  )
}

Filter.propTypes = {
  value: PropTypes.number.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

