import React, { useContext, useState, useEffect } from "react";

import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  };

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      buttonCaption={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleNameChange}
        id="profile-name"
        className="popup__input popup__input_value_name"
        type="text"
        name="name"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span className="profile-name-error popup__input-error"></span>
      <input
        value={description}
        onChange={handleDescriptionChange}
        id="profile-description"
        className="popup__input popup__input_value_description"
        type="text"
        name="description"
        required
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      />
      <span className="profile-description-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;