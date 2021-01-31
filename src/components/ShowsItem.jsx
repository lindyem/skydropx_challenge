import React from 'react'


function ShowsItem({item}) {
  return (
    <div>
      {item.name}
      <div>{ item.vote_average }</div>
      <div><img height="100px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
    </div>
  )
}

export default ShowsItem
