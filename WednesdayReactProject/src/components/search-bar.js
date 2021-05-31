import React from 'react';

const SearchBar = () => (
  <form action="/" method="get">
      <label htmlFor="header-search">
          <span className="visually-hidden">Search for an Artist</span>
      </label>
      <input
          type="text"
          id="header-search"
          placeholder="Search Here"
          name="s" 
      />
      <button type="submit">Search</button>
  </form>
);

export default SearchBar