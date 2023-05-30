import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard({});
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          title="Обновить аватар"
          name="update"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <fieldset className="popup__input">
            <input
              type="url"
              className="popup__item popup__item_type_avatar"
              name="avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__form-error popup__form-error_type_avatar avatar-error" />
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <fieldset className="popup__input">
            <input
              type="text"
              className="popup__item popup__item_type_name"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__form-error popup__form-error_type_name name-error" />
            <input
              type="text"
              className="popup__item popup__item_type_about"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__form-error popup__form-error_type_about about-error" />
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
        >
          <fieldset className="popup__input">
            <input
              type="text"
              className="popup__item popup__item_type_name"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__form-error popup__form-error_type_name name-error" />
            <input
              type="url"
              className="popup__item popup__item_type_link"
              placeholder="Ссылка на картинку"
              name="link"
              required
            />
            <span className="popup__form-error popup__form-error_type_link link-error" />
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="confitmation"
          onClose={closeAllPopups}
          buttonText="Да"
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={selectedCard}
        ></ImagePopup>
        <Footer />
      </div>
    </div>
  );
}

export default App;