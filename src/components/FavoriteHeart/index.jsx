import './FavoriteHeart.css'

function FavoriteHeart({isFavorite, onFavorite}) {
  return (
    <div className="ac-footer-container ac-footer-brand" onClick={(e) => {
      e.stopPropagation();
      onFavorite();
    }
    }>
      {isFavorite ? <span className="ac-icon ac-icon-love-dark ac-icon-love-fill"></span> : <span className="ac-icon ac-icon-love-dark"></span>  }
    </div>
  )
}

export default FavoriteHeart
