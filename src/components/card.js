import {
  showCard,
  getFormFields,
  clearFields,
  closePopup,
  changeButtonText,
  openPopup,
} from "./modal.js"
import {
  cardsContainer,
  cardsItemTemplate,
  popupAddImageElement,
  popUpAddImageButton,
  popUpDeleteCardElement,
  popUpDeleteCardForm,
  popupDeleteCardCloseButton,
  popUpDeleteCardOverlay,
  popUpDeleteCardButton,
} from "../constants/elements";
import {
  addNewCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} from "./api.js";
import { owner } from "../constants/constants.js";

function openApprovePopup(evt) {
  const item = evt.srcElement.closest('.cards__item');
  popUpDeleteCardElement.id = item.querySelector('.cards__image').id;
  openPopup(popUpDeleteCardElement);
  popUpDeleteCardForm.addEventListener('submit', removeCard)
}

function removeCard(evt) {
  evt.preventDefault();

  const id = evt.srcElement.closest('.popup_card-delete').id;
  const item = Array.from(cardsContainer.querySelectorAll('.cards__item')).find((el => {
    const imageId = el.querySelector('.cards__image').id;
    console.log(id, imageId)
    return id === imageId;
  }))
  deleteCard(id);
  item.remove();
  closePopup(popUpDeleteCardElement);
}

function renderCards(cardData) {
  const card = createCards(cardData);
  
  cardsContainer.prepend(card);
}

function createCards(cardData) {
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
    let button = document.createElement('button');
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

  likeButton.addEventListener('click', async () => {
    if (likeButton.className.includes('cards__likes_active')) {
      const { likes } = await deleteLikeCard(id);
      likeButton.classList.remove('cards__likes_active');
      likeAmount.textContent = likes.length;
    } else {
      const { likes } = await putLikeCard(id);
      likeButton.classList.add('cards__likes_active');
      likeAmount.textContent = likes.length;
    }
  })
  cardImageElement.addEventListener('click', () => showCard(cardImageElement.src, cardTextElement.textContent));

  return cardsItemElement;
}

async function addImage(evt) {
  evt.preventDefault();

  changeButtonText(popUpAddImageButton, true);
  const fields = getFormFields(popupAddImageElement);
  const name = fields.name;
  const link = fields.link;
  const { id, ownerId } = await addNewCard(name, link);
  console.log(popUpAddImageButton)

  if (!name || !link) {
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  } else {
    renderCards({ name, link, id, ownerId });
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  }
}

export {
  addImage,
  renderCards,
};