import React, { useEffect, useRef } from "react";

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) { avatarRef.current.focus(); }
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const link = avatarRef.current.value;
    onUpdateAvatar(link);
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonCaption={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        className="popup__input popup__input_value_description"
        type="url"
        name="description"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;