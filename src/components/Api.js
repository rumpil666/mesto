export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _analysisResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    };

  getInitialCards() {
    return fetch (`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._analysisResponse(res));
  }

  getUserInfo() {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
    })
    .then(res => this._analysisResponse(res));
  }

  editUserInfo(data) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.job  //проверить если не работает
      })
    })
    .then(res => this._analysisResponse(res));
  }

  addNewCard(data) {
    return fetch (`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._analysisResponse(res));
  }

  deleteCard(cardId) {
    return fetch (`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._analysisResponse(res));
  }

  setLike(cardId) {
    return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._analysisResponse(res));
  }

  deleteLike(cardId) {
    return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._analysisResponse(res));
  }

  editAvatar(data) {
    return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._analysisResponse(res));
  }
  // другие методы работы с API
}

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
//   headers: {
//     authorization: 'ea831264-f2d6-4316-98fa-307058f19068',
//     'Content-Type': 'application/json'
//   }
// });