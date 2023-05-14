import React from "react";
import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onFilterChange }) => {
  return (
    <div className={css.filter__wrapper}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={onFilterChange}
          required
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
