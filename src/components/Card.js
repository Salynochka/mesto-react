import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card" onClick={handleClick}>
      <button className="card__delete-button" type="button" />
      <div className="card__info">
        <img className="card__photo" src={props.link} alt={props.name} />
        <div className="card__subscribe">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__like-section">
            <button className="card__like" type="button" />
            <span className="card__like-counter">{props.likes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
