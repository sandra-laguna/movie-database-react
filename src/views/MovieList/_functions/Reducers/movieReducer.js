export const movieReducer = (state, { type, payload }) => {
    switch (type) {
      case 'SET_IS_LOADING':
        return { ...state, isLoading: payload };
      case 'SET_SEARCHED_FILTER':
        return { ...state, searchTerm: payload };
      case 'SET_TRAILER':
          return { ...state, trailer: payload };
      default:
        return state;
    }
  };
  