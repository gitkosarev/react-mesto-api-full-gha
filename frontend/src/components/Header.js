import React from "react";
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, email, actionCaption }) {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo"></div>
      </Link>
      <div className="header__login">
        {isLoggedIn && <p className="header__text">{email}</p>}
        <Link className="header__link" to={actionCaption?.url}>{actionCaption?.caption}</Link>
      </div>
    </header>
  );
}

export default Header;