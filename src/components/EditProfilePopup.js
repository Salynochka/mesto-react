import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [value, setValue] = React.useState('');

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
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
          onChange={handleChange}
          value={value.name}
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
          onChange={handleChange}
          value={value.about}
        />
        <span className="popup__form-error popup__form-error_type_about about-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
