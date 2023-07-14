const token = '8b428679-879b-499c-9d38-e9345ad6797c';
const groupId = 'plus-cohort-26';
const baseUrl = `https://nomoreparties.co/v1/${ groupId }`;

export const endpoints = {
  GET_USER: `/users/me`,
  GET_CARDS: `/cards`,
  PATCH_PROFILE: `/users/me`,
  POST_NEW_CARD: `/cards`,
  LIKES: (cardId) => `/cards/likes/${ cardId }`,
  DELETE_CARD: (cardId) => `/cards/${ cardId }`,
  UPDATE_AVATAR: `/users/me/avatar`,
}

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const config = {
  baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
}