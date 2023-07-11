export const mainPageElement = document.querySelector('.page');

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
export const popUpEditProfileNameInput = popupEditProfileElement.querySelector('#name-input');
export const popUpEditProfileDescriptionInput = popupEditProfileElement.querySelector('#description-input');

export const popupAddImageElement = mainPageElement.querySelector('.popup_image');
export const popupAddImageForm = popupAddImageElement.querySelector('.popup__form');
export const popupCloseAddImageElement = popupAddImageElement.querySelector('.popup__close');
export const popUpAddImageOverlay = popupAddImageElement.querySelector('.popup__overlay');
export const popUpAddImageNameInput = popupAddImageElement.querySelector('#name-input');
export const popUpAddImageLinkInput = popupAddImageElement.querySelector('#link-input');

export const popupViewElement = mainPageElement.querySelector('.popup_view');
export const popupViewText = popupViewElement.querySelector('.cards-view__text');
export const popupViewImage = popupViewElement.querySelector('.cards-view__image');
export const popupViewCloseButton = popupViewElement.querySelector('.popup__close');
export const popUpViewOverlay = popupViewElement.querySelector('.popup__overlay');

export const validationsConstants = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type-error',
  errorClass: 'popup__item_type-error_active',
};