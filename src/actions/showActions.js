export const setPopularShowsAction = (shows) => {
  return ({
    type: 'SET_POPULAR_SHOWS',
    payload: shows
  })
}

export const setTopShowsAction = (shows) => {
  return ({
    type: 'SET_TOP_SHOWS',
    payload: shows
  })
}

export const setOnTheAirShowsAction = (shows) => {
  return ({
    type: 'SET_ON_THE_AIR_SHOWS_SHOWS',
    payload: shows
  })
}

export const setFavoriteShowsAction = (shows) => {
  return ({
    type: 'SET_FAVORITE_SHOWS',
    payload: shows
  })
}