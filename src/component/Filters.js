import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Filters.css";
import { updateFilter } from "../store/actions"

const Filters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Handle", {name, value})
    dispatch(updateFilter({name, value}));
  };

  return (
    <div className="input-form">
      <h2>Introduce los valores</h2>
      <form className="input-row">
        {Object.keys(filters).map((stat) => (
          <div key={stat} className="input-group">
            <label>{stat.toUpperCase()}:</label>
            <input
              type="number"
              name={stat}
              value={filters[stat]}
              onChange={handleChange}
              min={0}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Filters;
