import React, { useState, useEffect } from "react";

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);


  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  };

  return (
    <PopupWithForm name="addCard" title="Новое место" buttonCaption={isLoading ? "Сохранение..." : "Добавить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleNameChange}
        id="card-name"
        className="popup__input popup__input_value_name"
        type="text"
        name="name"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
      />
      <span className="card-name-error popup__input-error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        id="card-link"
        className="popup__input popup__input_value_description"
        type="url"
        name="description"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="card-link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;