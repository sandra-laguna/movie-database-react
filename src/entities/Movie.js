export class Movie {
    constructor({ title, poster_path, overview, vote_average, id } = {}) {
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
        this.vote_average = vote_average;
        this.id = id;
    }
  }
  