import credentials from './utils.js';

class Api {
  constructor(baseUrl, cohortId, headers) {
    this._baseUrl = baseUrl;
    this._cohortId = cohortId;
    this._headers = headers;
  };

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  updateProfile(name, about) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse);
  };

  saveCard(name, link) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  toggleLike(cardId, isLiked) {
    if (isLiked) { return this.deleteLike(cardId); }
    else { return this.putLike(cardId) }
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  updateAvatar(link) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._handleResponse);
  };

}

const api = new Api(
  credentials.baseUrl,
  credentials.cohort,
  {
    authorization: credentials.token,
    "Content-Type": "application/json"
  }
);
export default api;