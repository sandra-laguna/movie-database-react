export const movieReducer = (state, { type, payload }) => {
    switch (type) {
      case 'SET_SEARCHED_MOVIES':
        return { ...state, searchedMovie: payload };
      default:
        return state;
    }
  };
  