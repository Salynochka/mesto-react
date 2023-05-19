import React from 'react';
import {Header} from './components/Header.js'
import {Footer} from './components/Footer.js'
import {Main} from './components/Main.js'

function App(props) {

  const [rating, setRating] = React.useState(0);

  const isEditProfilePopupOpen = false;
  const isAddPlacePopupOpen = false;
  const isEditAvatarPopupOpen = false;

  /*function handleEditAvatarClick () {
    const formUpdateAvatar = document.querySelector('.popup-update')
    formUpdateAvatar.classList.add('popup_opened');
    const isEditAvatarPopupOpen = true
  }

  function handleEditProfileClick () {
    const formEditProfile = document.querySelector('.popup-edit');
    formEditProfile.classList.add('popup_opened');
    const isEditProfilePopupOpen = true
  }

  function handleAddPlaceClick () {
    const formAddPlace = document.querySelector('.popup-add');
    formAddPlace.classList.add('popup_opened');
    const isAddPlacePopupOpen = true
  }*/

  return (
    <root className ="root">
      <div className ="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </root>
  );
}

export default App
