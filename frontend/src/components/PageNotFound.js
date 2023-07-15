import React from 'react';
import { Link } from 'react-router-dom';

import Bye from '../images/404.jpg';

function PageNotFound() {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        Ой, здесь ничего нет
      </h3>
      <Link className="not-found__link" to="/">На главную</Link>
      <img className="not-found__image" src={Bye} alt="страница не найдена" />
    </div>
  )
}

export default PageNotFound;