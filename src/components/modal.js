import {
  popupEditProfileElement,
  profileName,
  profileDescription,
  popupViewElement,
  popupViewImage,
  popupViewText,
} from "../script/script";


function getFormFields(element) {
  return Array.from(element.querySelectorAll('.popup__item'));
}

function openPopup(element) {
  element.classList.add('popup_opened');
}

const clearFields = element => {
  const formElement = element.querySelector('form');
  formElement.reset();
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function openProfilePopup() {
  const fields = getFormFields(popupEditProfileElement);

  fields.forEach(item => {
    if (item.name === 'name') {
      item.value = profileName.textContent;
    } else {
      item.value = profileDescription.textContent;
    }
  })

  openPopup(popupEditProfileElement);
}

function showCard(link, name) {
  popupViewImage.setAttribute('src', link);
  popupViewImage.setAttribute('alt', name);
  popupViewText.textContent = name;

  openPopup(popupViewElement);
}

export {
  openPopup,
  clearFields,
  closePopup,
  openProfilePopup,
  showCard,
}