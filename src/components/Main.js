import React from "react";
import pencil from "../images/pencil.svg";
import { api } from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((card) => {
        setCards(
          card.map((item) => ({
            link: item.link,
            name: item.name,
            cardId: item._id,
            likes: item.likes,
          }))
        );
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__photo"
            src={userAvatar}
            alt={userName}
          />
          <button
            className="profile__cover"
            onClick={props.onEditAvatar}
          >
            <img className="profile__pencil" src={pencil} alt="Карандаш" />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__entry">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__changes"
              onClick={props.onEditProfile}
              type="button"
            ></button>
          </div>
          <h2 className="profile__description">{userDescription}</h2>
        </div>
        <button
          className="profile__button-add"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            onCardClick={props.onCardClick}
            link={card.link}
            name={card.name}
            likes={card.likes}
            card={card}
            key = {card.cardId} 
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
