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
  closeAndClearPopup,
} from "../components/modal.js";

const logoElement = mainPageElement.querySelector('.header__logo');
import {
  mainPageElement,
  editProfileButton,
  addPictureButton,
  profileImage,
  popupEditProfileElement,
  popupEditProfileForm,
  popupCloseEditProfileElement,
  popUpEditProfileOverlay,
  popUpEditProfileNameInput,
  popUpEditProfileDescriptionInput,
  popupAddImageElement,
  popupAddImageForm,
  popUpAddImageNameInput,
  popUpAddImageLinkInput,
  popupCloseAddImageElement,
  popUpAddImageOverlay,
  popupViewElement,
  popupViewCloseButton,
  popUpViewOverlay,
  validationsConstants,
} from "../constants/elements";

editProfileButton.addEventListener('click', openProfilePopup);
popupCloseEditProfileElement.addEventListener('click', () => closeAndClearPopup(
  popupEditProfileForm, 
  popupEditProfileElement,
  [
    popUpEditProfileNameInput,
    popUpEditProfileDescriptionInput,
  ]
));
popUpEditProfileOverlay.addEventListener('click', () => closeAndClearPopup(
  popupEditProfileForm, 
  popupEditProfileElement,
  [
    popUpEditProfileNameInput,
    popUpEditProfileDescriptionInput,
  ]
));

popupEditProfileForm.addEventListener('submit', saveProfileInfo);
popupViewCloseButton.addEventListener('click', () => closePopup(popupViewElement));
popUpViewOverlay.addEventListener('click', () => closePopup(popupViewElement.closest('.popup')));

popupCloseAddImageElement.addEventListener('click', () => closeAndClearPopup(
  popupAddImageForm, 
  popupAddImageElement,
  [
    popUpAddImageNameInput,
    popUpAddImageLinkInput,
  ]
));
popUpAddImageOverlay.addEventListener('click', () => closeAndClearPopup(
  popupAddImageForm, 
  popupAddImageElement,
  [
    popUpAddImageNameInput,
    popUpAddImageLinkInput,
  ]
));

addPictureButton.addEventListener('click', () => openPopup(popupAddImageElement));
popupAddImageForm.addEventListener('submit', addImage);

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

enableValidation(validationsConstants); 