import React from 'react';
import { Spin } from 'antd';

import './ListCards.css';
import Cards from '../Card/Card';

const ListCards = ({ movies, isLoading }) => {
  return (
    <ul className="cards">
      {isLoading ? (
        <div className="loading">
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        movies.map((item) => {
          return <Cards item={item} key={item.id} />;
        })
      )}
    </ul>
  );
};

export default ListCards;
