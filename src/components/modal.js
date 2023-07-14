import {
  disableButton,
  hideInputError,
} from "./validate";
import {
  popupEditProfileElement,
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
  console.log(button, isLoad)
  if (isLoad) {
      button.textContent = 'Сохранение...'
  } else {
      button.textContent = 'Сохранить'
  }
  console.log(button, isLoad)
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.querySelector('.page').addEventListener('keydown', listener);
}

const listener = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    clearFields(openedPopup);
    closePopup(openedPopup);
  }
}

const clearFields = element => {
  const formElement = element.querySelector('form');

  if (formElement) {
    const buttonElement = formElement.querySelector('button');
    formElement.reset();

    changeButtonText(buttonElement, false);
    disableButton(buttonElement, validationsConstants.inactiveButtonClass);
  }
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.querySelector('.page').removeEventListener('keydown', listener);
}

function openProfilePopup() {
  const fields = getFormFields(popupEditProfileElement);

  fields.name = profileName.textContent;
  fields.description = profileDescription.textContent;

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

  clearFields(element);
  closePopup(element);
}

export {
  openPopup,
  clearFields,
  closePopup,
  openProfilePopup,
  showCard,
  getFormFields,
  closeAndClearPopup,
}