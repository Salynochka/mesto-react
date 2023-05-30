import React from 'react';

class Api {
    constructor({mainUrl, headers}){
      this._mainUrl = mainUrl;
      this._headers = headers;
    }

    //Получение карточек с сервера
    async getCards() {
      const res = await fetch(`${this._mainUrl}/cards`, {
        headers: this._headers,
      })
      return this._checkStatus(res);
    }

    //Добавление карточек
    async createNewCard(data) {
      const res = await fetch(`${this._mainUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
      })
      })
      return this._checkStatus(res);
    }
  
    //Удаление карточки
    async removeCard(cardId){
      const res = await fetch(`${this._mainUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      return this._checkStatus(res);
    }

    //Получение данных о пользователе
    async getUserInfo(){
      const res = await fetch(`${this._mainUrl}/users/me`, {
        headers: this._headers,
      })
      return this._checkStatus(res);
    }

    //Добавление данных о пользователе
    async editProfile(data){
      const res = await fetch(`${this._mainUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
      return this._checkStatus(res);
    };
  
    //Редактирование фото профиля
    async editAvatarPhoto(data){
      const res = await fetch(`${this._mainUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
      return this._checkStatus(res);
    };

    
    //Добавление лайка
    async addLike(cardId) {
      const res = await fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      return this._checkStatus(res);
    }
  
    //Удаление лайка
    async deleteLike(cardId) {
      const res = await fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      return this._checkStatus(res);
    }

    //Проверка ответа от сервера
    _checkStatus(res){
      if(res.ok){
        return  res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`)
    }

  }

  export const api = new Api({
    mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-65', 
    headers: {
      authorization: '9783f066-fc5b-47ba-8b84-b37b6039aee0',
      'Content-Type': 'application/json'
    },
  }); 