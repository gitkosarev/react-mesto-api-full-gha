import React from "react";

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_mode_image${card ? " popup_opened" : ""}`} id="openImagePopup">
      <div className="popup__container popup__container_mode_image">
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={`фото: ${card?.name}`} />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
        <button className="button popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default ImagePopup;