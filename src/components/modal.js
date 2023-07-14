import {
  disableButton,
  hideInputError,
} from "./validate";
import {
  popupEditProfileElement,
  popUpEditProfileNameInput,
  popUpEditProfileDescriptionInput,
  profileName,
  profileDescription,
  popupViewElement,
  popupViewImage,
  popupViewText,
  validationsConstants
} from "../constants/elements";


function getFormFields(element) {
  const arr = Array.from(element.querySelectorAll(validationsConstants.inputSelector));
  const obj = {};

  arr.forEach((el) => {
    obj[el.name] = el.value;
  })
  
  return obj;
}

export const changeButtonText = (button, isLoad) => {
  if (isLoad) {
      button.textContent = 'Сохранение...'
  } else {
      button.textContent = 'Сохранить'
  }
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.querySelector('.page').addEventListener('keydown', listener);
}

const listener = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

const clearFields = element => {
  const formElement = element.querySelector('form');
  const cardDeleteForm = formElement.closest('.popup_card-delete');
  

  if (formElement && !cardDeleteForm) {
    const buttonElement = formElement.querySelector('button');
    formElement.reset();

    changeButtonText(buttonElement, false);
    disableButton(buttonElement, validationsConstants.inactiveButtonClass);
  }
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.querySelector('.page').removeEventListener('keydown', listener);
  clearFields(element);
}

function openProfilePopup() {
  popUpEditProfileNameInput.value = profileName.textContent;
  popUpEditProfileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfileElement);
}

function showCard(link, name) {
  popupViewImage.src = link;
  popupViewImage.alt = name;
  popupViewText.textContent = name;

  openPopup(popupViewElement);
}

function closeAndClearPopup(form, element, inputs) {
  inputs.forEach(input => {
    hideInputError(form, input, { inputErrorClass: validationsConstants.inputErrorClass });
  })

  closePopup(element);
}

export {
  openPopup,
  closePopup,
  openProfilePopup,
  showCard,
  getFormFields,
  closeAndClearPopup,
}