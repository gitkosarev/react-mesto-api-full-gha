import React from "react";

function PopupWithForm({ title, name, buttonCaption, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup${isOpen ? " popup_opened" : ""}`} id={`${name}Popup`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          id={`${name}Form`}
          name={`${name}Form`}
          action="#"
          method="post"
          autoComplete="off"
          /* noValidate */
        >
          {children}
          <button className="button popup__submit" type="submit">{buttonCaption}</button>
        </form>
        <button className="button popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  );
};

export default PopupWithForm;