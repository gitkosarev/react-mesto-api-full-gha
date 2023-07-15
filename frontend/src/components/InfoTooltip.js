import React from "react";

import successImg from '../images/success.svg';
import unsuccessImg from '../images/unsuccess.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const successMessage = "Вы успешно зарегистрировались!";
  const unsuccessMessage = "Что-то пошло не так! Попробуйте ещё раз."
  const message = isSuccess ? successMessage : unsuccessMessage;

  return (
    <div className={`popup${isOpen ? " popup_opened" : ""}`} id="InfoTooltipPopup">
      <div className="popup__container popup__container_mode_signup">
        <img className="popup__image popup__image_mode_signup" src={isSuccess ? successImg : unsuccessImg} alt={message} />
        <p className="popup__text">{message}</p>
        <button className="button popup__close-button" type="button" onClick={onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;