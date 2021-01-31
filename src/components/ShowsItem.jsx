import { useHistory, useParams } from "react-router-dom";


function ShowsItem({ item }) {
  let history = useHistory();
  let { id } = useParams();

  const handleClick = () => {
    history.push(`/show/${item.id}`);
  }

  return (
    <div onClick={handleClick}>
      {item.name}
      <div>{ item.vote_average }</div>
      <div><img height="100px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
      {+id === item.id && <div>im selected</div>}
    </div>
  )
}

export default ShowsItem
