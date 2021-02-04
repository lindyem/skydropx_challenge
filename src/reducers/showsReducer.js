const initialState = {
  popularShows: [],
  topShows: [],
  onTheAirShows: [],
  favoriteShows: [],
}

export const showsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POPULAR_SHOWS':
      return {...state, popularShows: action.payload};
    case 'SET_TOP_SHOWS':
      return { ...state, topShows: action.payload };
    case 'SET_ON_THE_AIR_SHOWS_SHOWS':
      return { ...state, onTheAirShows: action.payload };
    case 'SET_FAVORITE_SHOWS':
      return {...state, favoriteShows: action.payload};
    default:
      return state;
  }
};
