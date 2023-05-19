//import React from 'react';

export function PopupWithForm(props) {

  return (
    <>
      <section className="popup popup-${props.name}">
        <div className="popup__container popup-${props.name}__container">
          <button className="popup__button-close" type="button"></button>
          <h2 className="popup__heading">{props.title}Обновить аватар</h2>
          <form className="popup__form popup-update__form" name="information-${props.name}">
            <fieldset className="popup__input">
              <input type="url" className="popup__item popup__item_type_avatar" name="avatar" placeholder="Ссылка на аватар" required />
              <span className="popup__form-error popup__form-error_type_avatar avatar-error"></span>
            </fieldset>
            <button className="popup__button" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup popup-${props.name}">
        <div className="popup__container popup-${props.name}__container">
          <button className="popup__button-close" type="button"></button>
          <h2 className="popup__heading">{props.title}Редактировать профиль</h2>
          <form className="popup__form popup-edit__form" name="information-${props.name}">
            <fieldset className="popup__input">
              <input type="text" className="popup__item popup__item_type_name" name="name" minLength="2" maxLength="40"required />
              <span className="popup__form-error popup__form-error_type_name name-error"></span>
              <input type="text" className="popup__item popup__item_type_about" name="about" minLength="2" maxLength="200" required />
              <span className="popup__form-error popup__form-error_type_about about-error"></span>
            </fieldset>
            <button className="popup__button" type="submit">Сохранить</button>
          </form>
        </div>
     </section>
      <section className="popup popup-${props.name}">
        <div className="popup__container popup-${props.name}__container">
          <button className="popup__button-close" type="button"></button>
          <h2 className="popup__heading">{props.title}Новое место</h2>
            <form className="popup__form popup-add__form" name="information-${props.name}">
            <fieldset className="popup__input">
              <input type="text" className="popup__item popup__item_type_name" name="name" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="popup__form-error popup__form-error_type_name name-error"></span>
              <input type="url" className="popup__item popup__item_type_link" placeholder="Ссылка на картинку" name="link" required />
              <span className="popup__form-error popup__form-error_type_link link-error"></span>
            </fieldset>
            <button className="popup__button" type="submit">Создать</button>
          </form>
        </div>
      </section>
      <section className="popup popup-${props.name}">
        <div className="popup__container popup-${props.name}__container">
          <button className="popup__button-close" type="button"></button>
          <h2 className="popup-confitmation__heading">{props.title}Вы уверены?</h2>
          <form className="popup__form popup-confirmation__form" name="information-${props.name}">
            <button className="popup__button" type="submit">Да</button>
          </form>
        </div>
      </section>
    </>
    )
}

ReactDOM.render((
    <>
      <PopupWithForm name="update" title="Обновить аватар"/>
      <PopupWithForm name="edit" title="Редактировать профиль"/>
      <PopupWithForm name="add" title="Новое место"/>
      <PopupWithForm name="confirmation" title="Вы уверены?"/>
    </>
  ), document.querySelector('#root'));