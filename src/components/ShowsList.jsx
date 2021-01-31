import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ShowsItem from './ShowsItem';

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

    // axios.get('https://api.themoviedb.org/3/tv/79611?api_key=9187861de4b69a7a0899826a4bdf2f74')
    // .then((response) => {
    //   console.log('test4', response.data);
    // })

  }, [])
  
  
  return (
    <section style={{ display: 'flex' }}>
      <div>
        {popular.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) } 
      </div>
      <div>
      {top.map((element) => {
          return (
            <ShowsItem item={element}/>
          )
        }) }
      </div>
      <div>
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
