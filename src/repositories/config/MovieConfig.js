export const MovieConfig = {
    getAll: '/3/discover/movie?sort_by=popularity.desc&api_key=a03066c5d8bc0cacef0bf9aeed31def9&page=1',
    getSearch: '/3/search/movie?api_key=a03066c5d8bc0cacef0bf9aeed31def9&query={:movieName}',
    getTrailer: '/3/movie/{:movieId}/videos?api_key=a03066c5d8bc0cacef0bf9aeed31def9&language=en-US'
  };
  