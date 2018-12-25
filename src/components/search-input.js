import React from 'react'

const SearchInput = ({ onChange }) => (
  <div className="search-input">
    <input type="text" name="search" placeholder="Search" onChange={event => onChange(event.currentTarget.value)} />
  </div>
);

export default SearchInput;
