import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'ca53fcfd9b35fe0287ff4e80d655dbf2';

export default class ApiService {
  static async getPopularMovies(pageNumber) {
    const url = `${baseUrl}movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
    const response = await axios.get(url);

    return response.data.results;
  }
}
