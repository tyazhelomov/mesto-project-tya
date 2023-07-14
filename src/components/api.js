import {
  endpoints,
  methods,
  config,
} from "../constants/constants";
import {
  profileName,
  profileDescription,
} from "../constants/elements";
import kusto from '../images/kusto.jpg';
import {
  renderCards,
} from '../components/card.js';
import { initialCards } from '../constants/cards.js';
import {
  loadUserInfo,
  loadCards
} from '../components/utils';

function getUserInfo() {
  fetch(`${ config.baseUrl }${ endpoints.GET_USER}`, {
    method: methods.GET,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => loadUserInfo(data))
  .catch(() => loadUserInfo({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: kusto,
  }));
}

function getInitialCards() {
  fetch(`${ config.baseUrl }${ endpoints.GET_CARDS}`, {
    method: methods.GET,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => loadCards(data))
  .catch(() => {
    initialCards.forEach(item => {
      const name = item.name;
      const link = item.link;
    
      renderCards({ name, link });
    })
  });
} 

function patchUserInfo(name, about) {
  fetch(`${ config.baseUrl }${ endpoints.PATCH_PROFILE}`, {
    method: methods.PATCH,
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch((err) => console.log(err));
}

function addNewCard(name, link) {
  return fetch(`${ config.baseUrl }${ endpoints.POST_NEW_CARD}`, {
    method: methods.POST,
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => {
    data.likes = [];
    return data;
  })
  .catch((err) => console.log(err));
}

function deleteCard(id) {
  fetch(`${ config.baseUrl }${ endpoints.DELETE_CARD(id)}`, {
    method: methods.DELETE,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => data)
  .catch((err) => console.log(err));
}

function putLikeCard(id) {
  return fetch(`${ config.baseUrl }${ endpoints.LIKES(id)}`, {
    method: methods.PUT,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => data)
  .catch((err) => console.log(err));
}

function deleteLikeCard(id) {
  return fetch(`${ config.baseUrl }${ endpoints.LIKES(id)}`, {
    method: methods.DELETE,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => data)
  .catch((err) => console.log(err));
}

function updateUserAvatar(avatar) {
  return fetch(`${ config.baseUrl }${ endpoints.UPDATE_AVATAR}`, {
    method: methods.PATCH,
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(data => loadUserInfo(data))
  .catch((err) => console.log(err));
}

export {
  getUserInfo,
  getInitialCards,
  patchUserInfo,
  addNewCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
  updateUserAvatar,
}