import {
  showCard,
  getFormFields,
  changeButtonText,
  openPopup,
} from "./modal.js"
import {
  cardsContainer,
  cardsItemTemplate,
  popupAddImageElement,
  popUpAddImageButton,
  popUpDeleteCardElement,
} from "../constants/elements";
import {
  addNewCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from "./api.js";

function openApprovePopup(evt) {
  const item = evt.srcElement.closest('.cards__item');
  popUpDeleteCardElement.id = item.querySelector('.cards__image').id;
  openPopup(popUpDeleteCardElement);
}

function removeCard(evt) {
  evt.preventDefault();

  const id = evt.srcElement.closest('.popup_card-delete').id;
  const item = Array.from(cardsContainer.querySelectorAll('.cards__item')).find((el => {
    const imageId = el.querySelector('.cards__image').id;
    return id === imageId;
  }))
  deleteCard(id, item, popUpDeleteCardElement);
}

function renderCards(owner, cardData) {
  const card = createCards(owner, cardData);
  
  cardsContainer.prepend(card);
}

function createCards(owner, cardData) {
  const {
    name,
    link,
    id,
    likes = [],
    ownerId,
  } = cardData;

  const cardsItemElement = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImageElement = cardsItemElement.querySelector('.cards__image');
  const cardTextElement = cardsItemElement.querySelector('.cards__text');
  const likeButton = cardsItemElement.querySelector('.cards__likes_button');
  const likeAmount = cardsItemElement.querySelector('.cards__likes_amount');

  if (ownerId === owner) {
    const button = document.createElement('button');
    button.className = 'cards__remove';
    button.type = 'button';
    cardsItemElement.append(button);
    button.addEventListener('click', openApprovePopup);
  }

  if (likes.find(like => like._id === owner)) {
    likeButton.classList.add('cards__likes_active');
  } else {
    likeButton.classList.remove('cards__likes_active');
  }

  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardImageElement.id = id;
  cardTextElement.textContent = name;
  likeAmount.textContent = likes.length;

  likeButton.addEventListener('click', () => {
    if (likeButton.className.includes('cards__likes_active')) {
      deleteLikeCard(id, likeButton, likeAmount);
    } else {
      putLikeCard(id, likeButton, likeAmount);
    }
  })
  cardImageElement.addEventListener('click', () => showCard(cardImageElement.src, cardTextElement.textContent));

  return cardsItemElement;
}

function addImage(evt) {
  evt.preventDefault();

  changeButtonText(popUpAddImageButton, true);
  const fields = getFormFields(popupAddImageElement);
  const name = fields.name;
  const link = fields.link;
  addNewCard(name, link, popupAddImageElement);
}

export {
  addImage,
  renderCards,
  removeCard,
};