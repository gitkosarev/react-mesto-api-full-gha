import '../index.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import api from '../utilities/api.js';
import auth from '../utilities/auth.js';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerActionCaption, setHeaderActionCaption] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const isOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpened) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpened]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((response) => {
          onLoginComplete(response.data.email);
        })
        .catch(error => {
          console.error(error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        onLoginComplete(email);
      })
      .catch(console.error);
  };

  function onLoginComplete(email) {
    setIsLoggedIn(true);
    setUserEmail(email);
    initData();
    navigate("/", { replace: true });
  };

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        navigate("/sign-in");
        handleInfoTooltipOpen(true, true);
      })
      .catch(error => {
        console.error(error);
        handleInfoTooltipOpen(true, false);
      });
  };

  function handleSignout() {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      navigate("/sign-in");
    }
  };

  function initData() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(console.error);
  };

  function handleHeaderActionCaption(caption) {
    setHeaderActionCaption(caption);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleInfoTooltipOpen(isOpen, isSuccess) {
    setIsRegisterSuccess(isSuccess);
    setIsInfoTooltipOpen(isOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card, isLiked) {
    api.toggleLike(card._id, isLiked)
      .then((updatedCard) => {
        setCards(cards.map((x) => x._id === card._id ? updatedCard : x));
      })
      .catch(console.error);
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((response) => {
        console.log(response);
        setCards(cards => cards.filter((x) => x._id !== card._id));
      })
      .catch(console.error);
  };

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.updateProfile(name, about)
      .then((response) => {
        console.log(response);
        setCurrentUser({
          ...currentUser,
          name,
          about
        });
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then((response) => {
        console.log(response);
        setCurrentUser({
          ...currentUser,
          avatar
        });
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api.saveCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} email={userEmail} actionCaption={headerActionCaption} handleSignout={handleSignout} />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/sign-up" element={<Register updateHeaderActionCaption={handleHeaderActionCaption} handleRegister={handleRegister} />} />
        <Route path="/sign-in" element={<Login updateHeaderActionCaption={handleHeaderActionCaption} handleLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute component={Main} isLoggedIn={isLoggedIn}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          updateHeaderActionCaption={handleHeaderActionCaption} />} />
      </Routes>
      <Footer />
      <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <EditProfilePopup isLoading={isLoading} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm name="confirm" title="Вы уверены?" buttonCaption="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isRegisterSuccess} />
    </CurrentUserContext.Provider>
  );
}

export default App;