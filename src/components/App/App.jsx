import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';

import './App.css';
import Paginations from '../Pagination/Pagination';
import ListCards from '../ListCards/ListCards';
import { Context } from '../../Context/Context';
import {
  createGuestSession,
  getGenres,
  getMovies,
  getPopulapMovies,
  getRatedMovies,
} from '../../ApiService/ApiService';
import Pages from '../Pages/Pages';
import FilterMovies from '../FilterMovies/FilterMovies';

function App() {
  const [movies, setMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState('Search');
  const [genresID, setGenres] = useState({ genres: [] });
  const [guestSession, setGuestSession] = useState('');

  function onError(err) {
    setError(err);
    setIsLoading(false);
  }

  function showMovies(value, page = 1) {
    if (!value) {
      setIsLoading(true);
      const popularData = getPopulapMovies(page);
      popularData
        .then((res) => {
          setMovies(res.results);
          setIsLoading(false);
          setPage(page);
          setTotalPage(() => {
            if (res.total_results >= 10000) {
              return 10000;
            }
          });
        })
        .catch((e) => {
          onError(e.message);
          setTotalPage(0);
        });
    } else {
      setIsLoading(true);
      const data = getMovies(`query=${value}&page=${page}`);
      data
        .then((res) => {
          if (!res.results.length) {
            throw new Error('Фильм с таким названием не найден');
          }
          setMovies(res.results);
          setIsLoading(false);
          setPage(page);
          setTotalPage(res.total_results);
        })
        .catch((e) => {
          onError(e.message);
          setTotalPage(0);
        });
    }
  }

  function showRate(page = 1) {
    if (currentTab === 'Rated') {
      setError('');
      setIsLoading(true);
      getRatedMovies(guestSession, `&page=${page}`)
        .then((res) => {
          if (!res.results.length) {
            setError('Вы ещё не оценили ни один фильм');
          }
          setRatedMovies(res.results);
          setTotalPage(res.total_results);
          setPage(page);
          setIsLoading(false);
        })
        .catch((e) => {
          onError(e);
          setTotalPage(0);
        });
    }
  }

  function searchingMovies(query) {
    setSearchValue(query);
    showMovies(query);
  }

  function changePage(page) {
    if (isSearch) showMovies(searchValue, page);
    if (!isSearch) showRate(page);
  }

  function changeTab(tab) {
    setError('');
    setCurrentTab(tab);
  }

  useEffect(() => {
    showMovies();
  }, []);

  useEffect(() => {
    if (isSearch) searchingMovies(searchValue);
    if (!isSearch) showRate();
  }, [currentTab]);

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res);
    });
    if (!sessionStorage.getItem('sessionID')) createGuestSession();
    setGuestSession(sessionStorage.getItem('sessionID'));
  }, []);

  const errMsg = error && <Alert type="error" message={error} />;
  const tabs = ['Search', 'Rated'];
  const isSearch = currentTab === 'Search';
  const body = isSearch ? (
    <ListCards movies={movies} isLoading={isLoading} />
  ) : (
    <ListCards movies={ratedMovies} isLoading={isLoading} />
  );

  return (
    <Context.Provider value={genresID}>
      <div className="wrapper">
        <header>
          <Pages onChangeTab={changeTab} tabs={tabs} />
        </header>
        <main>
          {isSearch && <FilterMovies onSearch={(query) => searchingMovies(query)} />}
          {errMsg}
          {body}
        </main>
        <footer>
          <Paginations maxPage={totalPage} page={page} onChangePage={(page) => changePage(page)} />
        </footer>
      </div>
    </Context.Provider>
  );
}

export default App;
