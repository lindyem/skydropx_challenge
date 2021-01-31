import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div style={{ display: 'flex' }}>
      <div>
        {popular.map((element) => {
          return (
            <div>{element.name}</div>
          )
        }) }
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ShowsList;
