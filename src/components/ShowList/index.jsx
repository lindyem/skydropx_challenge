import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowsItem from '../ShowItem';
import FilterSelect from '../FilterSelect';

import  './ShowList.css';

function ShowsList() {
  const [popular, setPopular] = useState([])
  const [top, setTop] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=9187861de4b69a7a0899826a4bdf2f74')
      .then((response) => {
        setPopular(response.data.results);
      })
    
    axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=9187861de4b69a7a0899826a4bdf2f74')
    .then((response) => {
      setTop(response.data.results);
    })
  
    axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=9187861de4b69a7a0899826a4bdf2f74')
      .then((response) => {
        setOnTheAir(response.data.results);
      })
    
    
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
        let filteredArray = [...popular].sort((a, b) => (a.name > b.name) ? 1 : -1);
        //setPopular(filteredArray)
      } else {
        let filteredArray = [...popular].sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1);
        //setPopular(filteredArray)
      }
    }
  }
  
  
  return (
    <section>
      <h1 className="headingCol">Popular <FilterSelect name="popular" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {popular.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) } 
      </div>

      <h1 className="headingCol">Top Rated <FilterSelect name="top" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">
        {top.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) }
      </div>
      <h1 className="headingCol">Trending Now <FilterSelect name="onTheAir" onFilter={handleOnFilter}/><hr/></h1>
      <div className="showRow">
        {onTheAir.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) }
      </div>  
      <h1 className="headingCol">Favorites <FilterSelect name="favorite" onFilter={handleOnFilter}/> <hr/></h1>
      <div className="showRow">

      </div> 
    </section>
  )
}

export default ShowsList;
