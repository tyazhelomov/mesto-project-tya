import '../pages/index.css';
import { initialCards } from '../constants/cards.js';
import logo from '../images/logo.svg';
import kusto from '../images/kusto.jpg';
import {
  addImage,
  renderCards,
} from '../components/card.js';
import {
  enableValidation,
  hideInputError,
} from '../components/validate.js';
import { saveProfileInfo } from '../components/utils.js';
import {
  openPopup,
  clearFields,
  closePopup,
  openProfilePopup,
} from "../components/modal.js";

export const mainPageElement = document.querySelector('.page');
const logoElement = mainPageElement.querySelector('.header__logo');

export const editProfileButton = mainPageElement.querySelector('.profile__edit-profile-button');
export const addPictureButton = mainPageElement.querySelector('.profile__add-button');
export const cardsContainer = mainPageElement.querySelector('.cards');
export const cardsItemTemplate = mainPageElement.querySelector('#cards__item-template').content;

export const profileElement = mainPageElement.querySelector('.profile__info');
export const profileImage = mainPageElement.querySelector('.profile__avatar');
export const profileName = profileElement.querySelector('.profile__name');
export const profileDescription = profileElement.querySelector('.profile__description');

export const popupEditProfileElement = mainPageElement.querySelector('.popup_profile');
export const popupEditProfileForm = popupEditProfileElement.querySelector('.popup__form');
export const popupCloseEditProfileElement = popupEditProfileElement.querySelector('.popup__close');
export const popUpEditProfileOverlay = popupEditProfileElement.querySelector('.popup__overlay');

export const popupAddImageElement = mainPageElement.querySelector('.popup_image');
export const popupAddImageForm = popupAddImageElement.querySelector('.popup__form');
export const popupCloseAddImageElement = popupAddImageElement.querySelector('.popup__close');
export const popUpAddImageOverlay = popupAddImageElement.querySelector('.popup__overlay');

export const popupViewElement = mainPageElement.querySelector('.popup_view');
export const popupViewText = popupViewElement.querySelector('.cards-view__text');
export const popupViewImage = popupViewElement.querySelector('.cards-view__image');
export const popupViewCloseButton = popupViewElement.querySelector('.popup__close');
export const popUpViewOverlay = popupViewElement.querySelector('.popup__overlay');

editProfileButton.addEventListener('click', openProfilePopup);
popupCloseEditProfileElement.addEventListener('click', () => {
  hideInputError(popupEditProfileForm, popupEditProfileForm.querySelector('#name-input'), { inputErrorClass: 'popup__item_type-error' });
  hideInputError(popupEditProfileForm, popupEditProfileForm.querySelector('#description-input'), { inputErrorClass: 'popup__item_type-error' });
  clearFields(popupEditProfileElement);
  closePopup(popupEditProfileElement);
});
popUpEditProfileOverlay.addEventListener('click', () => {
  hideInputError(popupEditProfileForm, popupEditProfileForm.querySelector('#name-input'), { inputErrorClass: 'popup__item_type-error' });
  hideInputError(popupEditProfileForm, popupEditProfileForm.querySelector('#description-input'), { inputErrorClass: 'popup__item_type-error' });
  clearFields(popupEditProfileElement.closest('.popup'));
  closePopup(popupEditProfileElement.closest('.popup'));
});

popupEditProfileForm.addEventListener('submit', saveProfileInfo);
popupViewCloseButton.addEventListener('click', () => closePopup(popupViewElement));
popUpViewOverlay.addEventListener('click', () => closePopup(popupViewElement.closest('.popup')));

popupCloseAddImageElement.addEventListener('click', () => {
  hideInputError(popupAddImageForm, popupAddImageForm.querySelector('#name-input'), { inputErrorClass: 'popup__item_type-error' });
  hideInputError(popupAddImageForm, popupAddImageForm.querySelector('#link-input'), { inputErrorClass: 'popup__item_type-error' });
  clearFields(popupAddImageElement);
  closePopup(popupAddImageElement);
});
popUpAddImageOverlay.addEventListener('click', () => {
  hideInputError(popupAddImageForm, popupAddImageForm.querySelector('#name-input'), { inputErrorClass: 'popup__item_type-error' });
  hideInputError(popupAddImageForm, popupAddImageForm.querySelector('#link-input'), { inputErrorClass: 'popup__item_type-error' });
  clearFields(popupAddImageElement.closest('.popup'));
  closePopup(popupAddImageElement.closest('.popup'));
});

addPictureButton.addEventListener('click', () => openPopup(popupAddImageElement));
popupAddImageForm.addEventListener('submit', addImage);

mainPageElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    clearFields(popupEditProfileElement.closest('.popup'));
    closePopup(popupEditProfileElement.closest('.popup'));
    closePopup(popupViewElement.closest('.popup'));
    clearFields(popupAddImageElement.closest('.popup'));
    closePopup(popupAddImageElement.closest('.popup'));
  }
})

profileImage.setAttribute('src', kusto);
logoElement.setAttribute('src', logo);

Array.from(mainPageElement.querySelectorAll('.popup')).forEach(el => {
  el.classList.remove('popup_display-none');
})

initialCards.forEach(item => {
  const name = item.name;
  const link = item.link;

  renderCards({ name, link });
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type-error',
  errorClass: 'popup__item_type-error_active',
}); 