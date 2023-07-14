import kusto from '../images/kusto.jpg';
import { renderCards } from '../components/card.js';
import { initialCards } from '../constants/cards.js';
import { loadUserInfo } from '../components/utils';
import { closePopup } from '../components/modal';
import {
  endpoints,
  methods,
  config,
} from "../constants/constants";
import {
  profileName,
  profileDescription,
} from "../constants/elements";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
}

function getUserInfo() {
  return fetch(`${ config.baseUrl }${ endpoints.GET_USER}`, {
    method: methods.GET,
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(data => data)
  .catch(() => loadUserInfo({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: kusto,
  }));
}

function getInitialCards() {
  return fetch(`${ config.baseUrl }${ endpoints.GET_CARDS}`, {
    method: methods.GET,
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(data => data)
  .catch(() => {
    initialCards.forEach(item => {
      const name = item.name;
      const link = item.link;
    
      renderCards({ name, link });
    })
  });
} 

function patchUserInfo(name, about, element) {
  fetch(`${ config.baseUrl }${ endpoints.PATCH_PROFILE}`, {
    method: methods.PATCH,
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(res => getResponseData(res))
  .then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(element);
  })
  .catch((err) => console.log(err));
}

function addNewCard(name, link, element) {
  fetch(`${ config.baseUrl }${ endpoints.POST_NEW_CARD}`, {
    method: methods.POST,
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(res => getResponseData(res))
  .then(data => {
    renderCards({
      name: data.name,
      link: data.link,
      id: data._id,
      ownerId: data.owner?._id,
    });

    closePopup(element);
  })
  .catch((err) => {
    console.log(err);

    closePopup(element);
  });
}

function deleteCard(id, item, element) {
  fetch(`${ config.baseUrl }${ endpoints.DELETE_CARD(id)}`, {
    method: methods.DELETE,
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(() => {
    item.remove();
    closePopup(element);
  })
  .catch((err) => console.log(err));
}

function putLikeCard(id, likeButton, likeAmount) {
  fetch(`${ config.baseUrl }${ endpoints.LIKES(id)}`, {
    method: methods.PUT,
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(data => {
    likeButton.classList.add('cards__likes_active');
    likeAmount.textContent = data.likes?.length;
  })
  .catch((err) => console.log(err));
}

function deleteLikeCard(id, likeButton, likeAmount) {
  fetch(`${ config.baseUrl }${ endpoints.LIKES(id)}`, {
    method: methods.DELETE,
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(data => {
    likeButton.classList.remove('cards__likes_active');
    likeAmount.textContent = data.likes?.length;
  })
  .catch((err) => console.log(err));
}

function updateUserAvatar(avatar, element) {
  fetch(`${ config.baseUrl }${ endpoints.UPDATE_AVATAR}`, {
    method: methods.PATCH,
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
  .then(res => getResponseData(res))
  .then(data => {
    loadUserInfo(data);
    closePopup(element);
  })
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