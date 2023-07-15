import React from "react";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((x) => x._id === currentUser?._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card, isLiked);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className="card">
      {isOwner &&
        <button
          onClick={handleDeleteClick}
          className="button card__trash-button"
          type="button">
        </button>}
      <img className="card__image" src={card.link} alt={`фото ${card.name}`} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <button
            onClick={handleLikeClick}
            className={`button card__like-button${isLiked ? " card__like-button_active" : ""}`}
            type="button">
          </button>
          <p className="card__like-counter">{card.likes ? card.likes.length : 0}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;