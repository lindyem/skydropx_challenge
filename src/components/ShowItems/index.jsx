import { useHistory, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";

import './ShowItems.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'rgba(255,255,255, 0.8)',
    width                 : "500px",
    borderRadius          : '25px'
  }
};

Modal.setAppElement('#root')

function ShowsItem({ item }) {
  const [details, setDetails] = useState({});
  let history = useHistory();
  let { id } = useParams();

  const [modalIsOpen,setIsOpen] = useState(false);
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

  useEffect(() => {
    if (+id === item.id) {
      axios.get(`https://api.themoviedb.org/3/tv/${item.id}?api_key=9187861de4b69a7a0899826a4bdf2f74`)
      .then((response) => {
        setDetails(response.data)
      })
    }
  }, [id])



  return (
    <Fragment>
      <div className="showCard" onClick={handleClick}>
        <div className="showInfo">
          <h3 className="title">{item.name}</h3>
          <div className="average"> Rating: {item.vote_average }</div>
        </div>
      <div><img height="250px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
      </div>
      
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <div>
        <h1 className="title">{item.name}</h1>
        <button className='btn' onClick={closeModal}>close</button>

        <div className="average">Rating: {item.vote_average}</div>
        <div><img height="250px" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}?api_key=9187861de4b69a7a0899826a4bdf2f74`} alt="" /></div>
        <div>
          <p>{details?.overview}</p>
          <div>
          Genre: {details?.genres?.map((genre) => {
            return <div>{genre.name}</div>
          })}
          Run Time: {details?.episode_run_time && details.episode_run_time[0]}
            </div>    
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default ShowsItem
