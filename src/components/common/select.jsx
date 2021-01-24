import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" name={name} id={name} {...rest}>
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
