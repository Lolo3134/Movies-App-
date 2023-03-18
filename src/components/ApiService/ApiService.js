// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListCards from '../ListCards/ListCards';

const ApiService = () => {
  const baseUrl = 'https://api.themoviedb.org/3/';
  const apiKey = 'ca53fcfd9b35fe0287ff4e80d655dbf2';
  const pageNumber = '1';

  const [items, setItem] = useState([]);

  const getPopularMovies = async () => {
    const url = `${baseUrl}movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
    const response = await axios.get(url);
    setItem(response.data.results);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
  return <ListCards items={items} />;
};

export default ApiService;
