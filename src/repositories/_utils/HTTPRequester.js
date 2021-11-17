import axios from 'axios';

export const HTTPRequester = (() => {
  // const baseURL = window.env.REACT_APP_BACKEND;
  const baseURL = 'https://api.themoviedb.org';
  //Maps object queryString to 'key=value' format. Checks if queryString is undefined or empty object
  const mapQueryString = queryString =>
    !queryString
      ? ''
      : Object.entries(queryString).length <= 0
      ? ''
      : `?${Object.entries(queryString)
          .map(key => `${key[0]}=${key[1]}&`)
          .join('')
          .slice(0, -1)}`;

  const HTTPRequesterAPI = {
    /* AXIOS */
    get: options => {
      const headers = options.headers;
      //console.log(`${baseURL}${options.url}${mapQueryString(options.queryString)}`);
      return axios.get(`${baseURL}${options.url}${mapQueryString(options.queryString)}`, { headers });
    }
  };
  return HTTPRequesterAPI;
})();
