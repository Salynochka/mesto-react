import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getCards(cards)
      .then((card) => {
        setCards([...card]);
       /* setCards(
          card.map((item) => ({
            link: item.link,
            name: item.name,
            key: item._id,
            likes: item.likes,
            owner: item.owner,
          }))
        );*/
      })
      .catch(console.error);
  }, []);

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

  function handleCardLike(card) {
    // Проверка наличия лайка на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => 
        setCards((state) => 
          state.filter((c) => c._id !== card._id))
    )
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatarPhoto(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleSubmitAddPlace(data) {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupWithForm
            title="Новое место"
            name="add"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonText="Создать"
            handleSubmit={handleSubmitAddPlace}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
