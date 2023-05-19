//import React from 'react';
import mainPhoto from '../images/photo.jpg';
import pencil from '../images/pencil.svg';


export function Main (props) {

      return (
        <>
        <section className="profile">
          <div className="profile__container">
            <img className="profile__photo" src={mainPhoto} alt="Фото Жак-Ив Кусто" />
            <button className="profile__cover" onClick={handleEditAvatarClick}><img className="profile__pencil" src={pencil} alt="Карандаш" /></button>
          </div>
          <div className="profile__info">
            <div className="profile__entry">
              <h1 className="profile__name">Данные отсутствуют</h1>
              <button className="profile__changes" onClick={handleEditProfileClick} type="button"></button>
            </div>
            <h2 className="profile__description">Данные отсутствуют</h2>
          </div>
          <button className="profile__button-add" onClick={handleAddPlaceClick} type="button"></button>
        </section>
        <section className="cards">
          <template className="card__template">
            <article className="card">
              <button className="card__delete-button" type="button"></button>
              <div className="card__info">
                <img className="card__photo" />
                <div className="card__subscribe">
                  <h2 className="card__title"></h2>
                  <div className="card__like-section">
                    <button className="card__like" type="button"></button>
                    <span className="card__like-counter"></span>
                  </div>
                </div>
              </div>
            </article>
          </template>
        </section>
        </>
      )
  }

  //export default Main