import {
  cardsContainer,
  cardsItemTemplate,
} from "../script/script.js";

import { showCard } from "./modal.js"

function removeCard(evt) {
  evt.srcElement.closest('.cards__item').remove();
}

function renderCards(cardData) {
  const card = createCards(cardData);
  
  cardsContainer.prepend(card);
}

function createCards(cardData) {
  const {
    name,
    link,
  } = cardData;

  const cardsItemElement = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImageElement = cardsItemElement.querySelector('.cards__image');
  const cardTextElement = cardsItemElement.querySelector('.cards__text');
  const likeButton = cardsItemElement.querySelector('.cards__like');
  const removeButton = cardsItemElement.querySelector('.cards__remove');

  cardImageElement.setAttribute('src', link);
  cardImageElement.setAttribute('alt', name);
  cardTextElement.textContent = name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('cards__like_active'))
  removeButton.addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', evt => {
    const link = evt.srcElement.currentSrc;
    const name = evt.srcElement.closest('.cards__item').textContent;

    showCard(link, name)
  });

  return cardsItemElement;
}

function addImage(evt) {
  evt.preventDefault();

  const fields = getFormFields(popupAddImageElement);
  let name;
  let link;

  fields.forEach(el => {
    if (el.id === 'name-input') {
      name = el.value;
    } else if (el.id === 'link-input') {
      link = el.value
    }
  })

  if (!name || !link) {
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  } else {
    renderCards({ name, link });
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  }
}

export {
  addImage,
  renderCards,
};