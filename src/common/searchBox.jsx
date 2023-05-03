import React from "react";

function SearchBox({ name, value, onChange, ...rest }) {
  return (
    <div className="input-group">
      <input
        {...rest}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control border-end-0 border rounded-pill"
        placeholder="Search..."
      />
      <span className="input-group-append">
        <button
          className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
          type="button"
          disabled
        >
          <i className="fa fa-search"></i>
        </button>
      </span>
    </div>
  );
}

export default SearchBox;
