import './index.css';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {variablesForValidation, 
  formEditProfile, formAddCard, formUpdateProfile, 
  nameInput, jobInput, avatarInput, profileName, profileDescription, profilePhoto, profileCover,
  popupEditProfile, popupAddCard, popupUpdateProfile, popupConfirmation, 
  buttonChangeProfile, buttonAddNewCard, buttonSubmit,
  cardTemplate, popupWithPhoto} from '../utils/constants.js';

  let userId

  const api = new Api({
    mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-65', 
    headers: {
      authorization: '9783f066-fc5b-47ba-8b84-b37b6039aee0',
      'Content-Type': 'application/json'
    },
  }); 
  
  //Экземпляр новых данных профиля
  const profileInfo = new UserInfo({
    name: profileName, 
    about: profileDescription,
    avatar: profilePhoto,
  })

  //Экзамепляр класса увеличения карточки
  const increasePopup = new PopupWithImage(popupWithPhoto)
  increasePopup.setEventListeners();
  
  //Создание карточек
  const createCard = (item) => {
    const card = new Card({
      data: item,
      cardTemplate: cardTemplate,
      handleCardClick: () => increasePopup.open(item),
      userId: userId,
      handleDeleteClick: () => {
        confirmationPopup.open(card)
        confirmationPopup.submitForm(()=>{
          handleConfirmationSubmit(card)
        })
      },
      like: () => {
        api.addLike(item._id)
        .then(res => {
          card.addLike()
          card.setLikes(res)
        })
        .catch((err) => console.error(`Ошибка: ${err}`))
      },
      dislike: () => {
        api.deleteLike(item._id)
        .then(res =>{
          card.removeLike()
          card.setLikes(res)
        })
        .catch((err) => console.error(`Ошибка: ${err}`))
      }
    })
    return card.generateCard()
  }
  
  const cardSection = new Section({
    renderer: (item) => {
      cardSection.addItem(createCard(item))
    }
  }, '.cards' )
  
  // Экземпляры классов валидации всех модальных окон
  const profileValidation = new FormValidator(variablesForValidation, formEditProfile)
  const newCardValidation = new FormValidator(variablesForValidation, formAddCard)
  const updateProfileValidation = new FormValidator(variablesForValidation, formUpdateProfile)
  profileValidation.enableValidation()
  newCardValidation.enableValidation()
  updateProfileValidation.enableValidation()
  
  //Экземпляр класса попапа подтверждения удаления карточки
  const confirmationPopup = new PopupWithConfirmation({
    popup: popupConfirmation, 
    submitForm: handleConfirmationSubmit
  })
  confirmationPopup.setEventListeners();
  
  //Редактирование профиля
  const handleProfileSubmit = (data) => {
    const {name, about} = data
    return api.editProfile({name, about})
      .then((res) => {
        profileInfo.setUserInfo(res)
      })
     .catch((err) => console.error(`Ошибка: ${err}`))
  }
  
  //Изменение аватара
  const handleAvatarSubmit = (data) => {
    const {avatar} = data
    return api.editAvatarPhoto({avatar})
      .then((res) => {
        profileInfo.setUserInfo(res)
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  }
  
  //Подтверждение удаления карточки
  const handleConfirmationSubmit = (card) => {
    return api.removeCard(card._id)
      .then(() => {    
        card.deleteCard()
        confirmationPopup.close()
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  }

  //Добавление карточки
  const handleCardSubmit = (data) => {
    return api.createNewCard(data)
      .then((res)=> {
        const card = createCard(res)
        cardSection.addItem(card)
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  }

  // Создание экземпляра классов модальных окон
  // редактирования профиля и добавления карточки
  const profilePopup = new PopupWithForm({
    popup: popupEditProfile, 
    submitForm: handleProfileSubmit,
    validation: profileValidation,
    submitButton: buttonSubmit
  })
  
  profilePopup.setEventListeners();
  
  const newCardPopup = new PopupWithForm({
    popup: popupAddCard, 
    submitForm: handleCardSubmit,
    validation: newCardValidation,
    submitButton: buttonSubmit
  })
  newCardPopup.setEventListeners();
  
  const updateProfilePopup = new PopupWithForm({
    popup: popupUpdateProfile, 
    submitForm: handleAvatarSubmit,
    validation: updateProfileValidation,
    submitButton: buttonSubmit
  })
  
  updateProfilePopup.setEventListeners();
  
  // Слушатели
  buttonChangeProfile.addEventListener('click', () => {
    const currentProfileInfo = profileInfo.getUserInfo();
    nameInput.value = currentProfileInfo.profileName;
    jobInput.value = currentProfileInfo.profileDescription;
    profilePopup.open()
  })
   
  buttonAddNewCard.addEventListener('click', () => {
    newCardValidation.toggleButtonState();
    newCardPopup.open();
    newCardValidation.resetValidation();
  })
  
  profileCover.addEventListener('click', () => {
    updateProfileValidation.toggleButtonState();
    updateProfilePopup.open();
    updateProfileValidation.resetValidation();
  })
  
  Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userInfo, cards]) => {
      userId = userInfo._id
      profileInfo.setUserInfo(userInfo)
      cardSection.renderedItems(cards)
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
  