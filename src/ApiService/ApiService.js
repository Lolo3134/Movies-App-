//import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'api_key=e268401b0f5f73438daedd6dc8bc70ee&language=en-US';

function checkConnection() {
  if (!navigator.onLine) {
    throw new Error('Отсутствует подключение к сети!');
  }
}

async function getMovies(url) {
  checkConnection();

  const response = await fetch(`${baseUrl}search/movie?${apiKey}&${url}`);

  if (!response.ok) {
    throw new Error(`Не удалось получить данные, ${response.status}`);
  }

  return await response.json();
}

async function getPopulapMovies(page) {
  checkConnection();

  const response = await fetch(`${baseUrl}movie/popular?${apiKey}&page=${page}`);

  if (!response.ok) {
    throw new Error(`Не удалось получить данные, ${response.status}`);
  }

  return await response.json();
}

async function getGenres() {
  checkConnection();

  const response = await fetch(`${baseUrl}genre/movie/list?${apiKey}`);

  if (!response.ok) {
    throw new Error('Не удалось получить жанры!');
  }

  return await response.json();
}

async function createGuestSession() {
  checkConnection();

  const response = await fetch(`${baseUrl}authentication/guest_session/new?${apiKey}`);

  if (!response.ok) {
    throw new Error(`Не удалось создать гостевую сессию, ${response.status}`);
  }

  const { guest_session_id: guestID } = await response.json();
  sessionStorage.setItem('sessionID', guestID);
}

async function getRatedMovies(sessionID, url) {
  checkConnection();

  const response = await fetch(`${baseUrl}guest_session/${sessionID}/rated/movies?${apiKey}&${url}`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return await response.json();
}

async function postRated(movieID, guestSession, star) {
  checkConnection();
  const response = await fetch(`${baseUrl}movie/${movieID}/rating?${apiKey}&guest_session_id=${guestSession}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: star }),
  });

  if (!response.ok) {
    throw new Error(`Не удалось оценить фильм, ${response.status}`);
  }
}

export { getMovies, getPopulapMovies, getGenres, createGuestSession, getRatedMovies, postRated };
