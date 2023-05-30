import React from 'react';

function ImagePopup (props) {
  return (
    <section className={`popup popup-increase ${props.isOpen && 'popup_opened'}`}>{props.card}
      <div className="popup-increase__container">
        <img className="popup-increase__photo" src={props.link} alt={props.name}/>
        <button className="popup__button-close popup-increase__button-close" onClick={props.onClose} type="button"></button>
        <h2 className="popup-increase__heading">{props.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup