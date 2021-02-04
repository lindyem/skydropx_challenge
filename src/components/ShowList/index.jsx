import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ShowItem from '../ShowItem';
import FilterSelect from '../FilterSelect';

import { setPopularShowsAction, setTopShowsAction, setOnTheAirShowsAction, setFavoriteShowsAction } from '../../actions/showActions';

import  './ShowList.css';

function ShowsList({popularShows, topShows, onTheAirShows, favoriteShows, setPopularShows, setTopShows, setOnTheAirShows, setFavoriteShows}) {
  useEffect(() => {
    const popularApi = axios.get('https://api.themoviedb.org/3/tv/popular?api_key=9187861de4b69a7a0899826a4bdf2f74');
    const topApi = axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=9187861de4b69a7a0899826a4bdf2f74');
    const onTheAirApi = axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=9187861de4b69a7a0899826a4bdf2f74');


    axios.all([popularApi, topApi, onTheAirApi]).then(axios.spread((...responses) => {
      const popularData = responses[0].data.results
      const topData = responses[1].data.results
      const onTheAirData = responses[2].data.results

      setPopularShows(popularData);
      setTopShows(topData);
      setOnTheAirShows(onTheAirData);

      const favoriteIds = { ...localStorage };
      const favoriteShows = []
      for (let id in favoriteIds) {
        if (popularData.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
          favoriteShows.push(popularData.find((show) => show.id === +id))
        } else if (topData.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
          favoriteShows.push(topData.find((show) => show.id === +id))
        } else if (onTheAirData.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
          favoriteShows.push(onTheAirData.find((show) => show.id === +id))
        }
      }
      setFavoriteShows(favoriteShows);
    }))
  }, [])

  const handleOnFilter = (filterValue, name) => {
    if (name === 'popular') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...popularShows].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setPopularShows(filteredArray)
      } else {
        let filteredArray = [...popularShows].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setPopularShows(filteredArray)
      }
    } else if (name === 'top') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...topShows].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setTopShows(filteredArray)
      } else {
        let filteredArray = [...topShows].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setTopShows(filteredArray)
      }
    } else if (name === 'onTheAir') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...onTheAirShows].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setOnTheAirShows(filteredArray)
      } else {
        let filteredArray = [...onTheAirShows].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setOnTheAirShows(filteredArray)
      }
    } else if (name === 'favorite') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...favoriteShows].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFavoriteShows(filteredArray)
      } else {
        let filteredArray = [...favoriteShows].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setFavoriteShows(filteredArray)
      }
    }
  }

  const handleFavorite = () => {
    const favoriteIds = { ...localStorage };
    const favoriteShows = []
    for (let id in favoriteIds) {
      if (popularShows.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(popularShows.find((show) => show.id === +id))
      } else if (topShows.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(topShows.find((show) => show.id === +id))
      } else if (onTheAirShows.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(onTheAirShows.find((show) => show.id === +id))
      }
    }
    setFavoriteShows(favoriteShows);
  }
  return (
    <section>
      <h1 className="headingCol">Popular <FilterSelect name="popular" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {popularShows.map((element) => {
          return (
            <ShowItem key={`popular-${element.id}`} item={element} onFavorite={handleFavorite} favoriteIds={favoriteShows.map(x => x.id)}/>
          )
        }) } 
      </div>

      <h1 className="headingCol">Top Rated <FilterSelect name="top" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">
        {topShows.map((element) => {
          return (
            <ShowItem key={`top-${element.id}`}  item={element} onFavorite={handleFavorite} favoriteIds={favoriteShows.map(x => x.id)}/>
          )
        }) }
      </div>
      <h1 className="headingCol">Trending Now <FilterSelect name="onTheAir" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {onTheAirShows.map((element) => {
          return (
            <ShowItem key={`onTheAir-${element.id}`}  item={element} onFavorite={handleFavorite} favoriteIds={favoriteShows.map(x => x.id)}/>
          )
        }) }
      </div>  
      <h1 className="headingCol">Favorites <FilterSelect name="favorite" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">
        {favoriteShows.map((element) => {
          return (
            <ShowItem key={`favorites-${element.id}`} item={element} onFavorite={handleFavorite} favoriteIds={favoriteShows.map(x => x.id)}/>
          )
        }) }
      </div> 
    </section>
  )
}

const mapStateToProps = state => {
  return {
    popularShows: state.shows.popularShows,
    topShows: state.shows.topShows,
    onTheAirShows: state.shows.onTheAirShows,
    favoriteShows: state.shows.favoriteShows,
  };
};

const mapDispatchToProps = dispatch => ({
  setPopularShows: (shows) => dispatch(setPopularShowsAction(shows)),
  setTopShows: (shows) => dispatch(setTopShowsAction(shows)),
  setOnTheAirShows: (shows) => dispatch(setOnTheAirShowsAction(shows)),
  setFavoriteShows: (shows) => dispatch(setFavoriteShowsAction(shows)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowsList);

