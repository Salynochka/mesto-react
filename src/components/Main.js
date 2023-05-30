import React from 'react';
//import mainPhoto from '../images/photo.jpg';
import pencil from '../images/pencil.svg';
import {api} from '../utils/api.js';
import Card from './Card.js'

function Main (props) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')

  React.useEffect(()=>{
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
     .catch((err) => console.error(`Ошибка: ${err}`));
  }, [])

      return (
        <>
        <section className="profile">
          <div className="profile__container">
            <img className="profile__photo" src={userAvatar} alt="Фото Жак-Ив Кусто" />
            <button className="profile__cover" onClick={()=>{props.onEditAvatar(true)}}><img className="profile__pencil" src={pencil} alt="Карандаш" /></button>
          </div>
          <div className="profile__info">
            <div className="profile__entry">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__changes" onClick={()=>{props.onEditProfile(true)}} type="button"></button>
            </div>
            <h2 className="profile__description">{userDescription}</h2>
          </div>
          <button className="profile__button-add" onClick={()=>{props.onAddPlace(true)}} type="button"></button>
        </section>
        <section className="cards">
          {props.cards.map((card)=> (
            <Card
              onCardClick = {props.onCardClick}
              link = {card.link}
              name = {card.name}
              likes = {card.likes}
              card = {card}
              key = {card.cardId}
            />
          ))}
        </section>
        </>
      )
  }

  export default Main

