import React, { useEffect } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, updateHeaderActionCaption }) {
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    const setHeaderActionCaption = () => {
      updateHeaderActionCaption("Выйти");
    };
    setHeaderActionCaption();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={currentUser?.avatar} alt="аватар" />
          <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button className="button profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button className="button profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;