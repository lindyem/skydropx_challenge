import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";


function ShowsItem({ item }) {
  const [details, setDetails] = useState({});
  let history = useHistory();
  let { id } = useParams();

  const handleClick = () => {
    history.push(`/show/${item.id}`);
  }

  useEffect(() => {
    if (+id === item.id) {
      axios.get(`https://api.themoviedb.org/3/tv/${item.id}?api_key=9187861de4b69a7a0899826a4bdf2f74`)
      .then((response) => {
        setDetails(response.data)
      })
    }
  }, [id])

  return (
    <div onClick={handleClick}>
      {item.name}
      <div>{ item.vote_average }</div>
      <div><img height="100px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
      {+id === item.id && (
        <div>
          {details?.overview}
          Genre: {details?.genres?.map((genre) => {
            return <div>{genre.name}</div>
          })}
         Run Time: {details?.episode_run_time && details.episode_run_time[0]}
        </div>
      )}
    </div>
  )
}

export default ShowsItem
