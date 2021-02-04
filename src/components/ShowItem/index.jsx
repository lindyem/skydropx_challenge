import { useHistory, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import FavoriteHeart from "../FavoriteHeart";
import './ShowItem.css';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              : '60vw',
    background            : 'rgba(255,255,255, 0.8)',
    borderRadius          : '25px'
  }
};

Modal.setAppElement('#root')

function ShowsItem({ item, onFavorite, favoriteIds }) {
  const [details, setDetails] = useState({});
  let history = useHistory();
  let { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    if (+id === item.id) {
      axios.get(`https://api.themoviedb.org/3/tv/${item.id}?api_key=9187861de4b69a7a0899826a4bdf2f74`)
      .then((response) => {
        setDetails(response.data)
      })
    }
  }, [id])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }

  const handleClick = () => {
    history.push(`/show/${item.id}`);
    openModal();
  }

  const handleFavorite = () => {
    if (favoriteIds?.includes(item.id)) {
      localStorage.removeItem(item.id);
    } else {
      localStorage.setItem(item.id, true);
    }

    onFavorite();
  }


  return (
    <Fragment>
      <div className="showCard" onClick={handleClick}>
        <div className="showHeader">
          <h3 className="title">{item.name}</h3>
          <FavoriteHeart isFavorite={favoriteIds?.includes(item.id)} onFavorite={handleFavorite}/>
        </div>
        <div><img height="250px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
        <div className="average"> Rating: {item.vote_average }</div>
      </div>
      
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
        <div className="modalContent">
        <button className='btn' onClick={closeModal}>X</button>
          <h1 className="titleModal">{item.name}</h1>
          <div className="averageModal">Rating: {item.vote_average}</div>
          <div className="favoriteHeartModal"><FavoriteHeart isFavorite={favoriteIds?.includes(item.id)} onFavorite={handleFavorite}/></div>
          <div><img height="250px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
        <div>
          <p className="overviewModal">{details?.overview}</p>
            <div className="showInfo">
              <div>
              <strong>Genre:</strong> {details?.genres?.map((genre) => {
                return <div>{genre.name}</div>
                  })}
              </div>
              <div>
                <strong>Run Time:</strong>
                <div>
                {details?.episode_run_time && details.episode_run_time[0]} Mins
                </div>
              </div>
            </div>    
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default ShowsItem
