import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowsItem from '../ShowItems';

import main from './main.css';

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
  
  
  return (
    <section>
      <h1 className="headingCol">Popular</h1>
      <div className="showRow">
      {popular.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) } 
      </div>

      <h1 className="headingCol">Top Rated</h1>
      <div className="showRow">
      {top.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) }
      </div>
      <h1 className="headingCol">Trending Now</h1>
       <div className="showRow">
      {onTheAir.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) }
      </div>  
    </section>
  )
}

export default ShowsList;
