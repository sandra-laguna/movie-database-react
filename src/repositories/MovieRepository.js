import { MovieConfig } from './config/MovieConfig';
import { getUrl } from './_utils/UrlUtils';
import { HTTPRequester } from './_utils/HTTPRequester';

export const movieRepository = {
  getAll: async () =>
    await HTTPRequester.get({
      url: getUrl(MovieConfig.getAll, {})
    }),

  searchMovie: async movieName =>
    await HTTPRequester.get({
      url: getUrl(MovieConfig.getSearch, { movieName })
    }),

  getTrailer: async movieId => {
    return await HTTPRequester.get({
      url: getUrl(MovieConfig.getTrailer, { movieId })
    });
  },

  getReleaseDate: async movieId => {
    return await HTTPRequester.get({
      url: getUrl(MovieConfig.getReleaseDate, { movieId })
    });
  }
};
