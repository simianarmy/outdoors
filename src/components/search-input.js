import React from 'react'

const SearchInput = ({ onChange }) => (
  <>
    <input className="border-2" type="text" name="search" placeholder="Search" onChange={event => onChange(event.currentTarget.value)} />
  </>
);

export default SearchInput;
