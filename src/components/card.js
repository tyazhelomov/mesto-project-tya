import {
  showCard,
  getFormFields,
  clearFields,
  closePopup,
} from "./modal.js"
import {
  cardsContainer,
  cardsItemTemplate,
  popupAddImageElement,
  validationsConstants,
} from "../constants/elements";

function removeCard(evt) {
  evt.srcElement.closest(validationsConstants.inputSelector).remove();
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

  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardTextElement.textContent = name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('cards__like_active'))
  removeButton.addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', () => showCard(cardImageElement.src, cardTextElement.textContent));

  return cardsItemElement;
}

function addImage(evt) {
  evt.preventDefault();

  const fields = getFormFields(popupAddImageElement);
  const name = fields.name;
  const link = fields.link;

  if (!name || !link) {
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  } else {
    renderCards({ name, link });
    console.log(123)
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  }
}

export {
  addImage,
  renderCards,
};