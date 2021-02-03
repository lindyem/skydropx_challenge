import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowsItem from '../ShowItem';
import FilterSelect from '../FilterSelect';

import  './ShowList.css';

function ShowsList() {
  const [popular, setPopular] = useState([])
  const [top, setTop] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [favorites, setFavorites] = useState([])
  

  useEffect(() => {
    const popularApi = axios.get('https://api.themoviedb.org/3/tv/popular?api_key=9187861de4b69a7a0899826a4bdf2f74');
    const topApi = axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=9187861de4b69a7a0899826a4bdf2f74');
    const onTheAirApi = axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=9187861de4b69a7a0899826a4bdf2f74');


    axios.all([popularApi, topApi, onTheAirApi]).then(axios.spread((...responses) => {
      const popularData = responses[0].data.results
      const topData = responses[1].data.results
      const onTheAirData = responses[2].data.results

      setPopular(popularData);
      setTop(topData);
      setOnTheAir(onTheAirData);

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
        setFavorites(favoriteShows);
    }))
  }, [])

  const handleOnFilter = (filterValue, name) => {
    if (name === 'popular') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...popular].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setPopular(filteredArray)
      } else {
        let filteredArray = [...popular].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setPopular(filteredArray)
      }
    } else if (name === 'top') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...top].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setTop(filteredArray)
      } else {
        let filteredArray = [...top].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setTop(filteredArray)
      }
    } else if (name === 'onTheAir') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...onTheAir].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setOnTheAir(filteredArray)
      } else {
        let filteredArray = [...onTheAir].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setOnTheAir(filteredArray)
      }
    } else if (name === 'favorite') {
      if (filterValue === 'alphabet') {
        let filteredArray = [...favorites].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFavorites(filteredArray)
      } else {
        let filteredArray = [...favorites].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        setFavorites(filteredArray)
      }
    }
  }

  const handleFavorite = () => {
    const favoriteIds = { ...localStorage };
    const favoriteShows = []
    for (let id in favoriteIds) {
      if (popular.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(popular.find((show) => show.id === +id))
      } else if (top.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(top.find((show) => show.id === +id))
      } else if (onTheAir.filter((show) => show.id === +id).length > 0 && !favoriteShows.filter((show) => show.id === +id).length > 0) {
        favoriteShows.push(onTheAir.find((show) => show.id === +id))
      }
    }
    setFavorites(favoriteShows);
  }


  return (
    <section>
      <h1 className="headingCol">Popular <FilterSelect name="popular" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {popular.map((element) => {
          return (
            <ShowsItem key={`popular-${element.id}`} item={element} onFavorite={handleFavorite} favoriteIds={favorites.map(x => x.id)}/>
          )
        }) } 
      </div>

      <h1 className="headingCol">Top Rated <FilterSelect name="top" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">
        {top.map((element) => {
          return (
            <ShowsItem key={`top-${element.id}`}  item={element} onFavorite={handleFavorite} favoriteIds={favorites.map(x => x.id)}/>
          )
        }) }
      </div>
      <h1 className="headingCol">Trending Now <FilterSelect name="onTheAir" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {onTheAir.map((element) => {
          return (
            <ShowsItem key={`onTheAir-${element.id}`}  item={element} onFavorite={handleFavorite} favoriteIds={favorites.map(x => x.id)}/>
          )
        }) }
      </div>  
      <h1 className="headingCol">Favorites <FilterSelect name="favorite" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">
        {favorites.map((element) => {
          return (
            <ShowsItem key={`favorites-${element.id}`} item={element} onFavorite={handleFavorite} favoriteIds={favorites.map(x => x.id)}/>
          )
        }) }
      </div> 
    </section>
  )
}

export default ShowsList;
