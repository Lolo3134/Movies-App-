import React from 'react';

import './Header.css';
import Pages from './Pages/Pages';
import FilterMovies from './FilterMovies/FilterMovies';

function Header() {
  return (
    <header>
      <Pages />
      <FilterMovies />
    </header>
  );
}

export default Header;
