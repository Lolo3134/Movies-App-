import React from 'react';

import './App.css';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import ListCards from '../ListCards/ListCards';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <ListCards />
      </main>
      <footer>
        <Pagination />
      </footer>
    </div>
  );
}

export default App;
