import '../pages/index.css';
import logo from '../images/logo.svg';
import {
  addImage,
} from '../components/card.js';
import {
  enableValidation,
} from '../components/validate.js';
import {
  saveProfileInfo,
  updateProfile,
} from '../components/utils.js';
import {
  openPopup,
  closePopup,
  openProfilePopup,
  closeAndClearPopup,
} from "../components/modal.js";
import {
  getUserInfo,
  getInitialCards,
} from '../components/api';

const logoElement = mainPageElement.querySelector('.header__logo');
import {
  mainPageElement,
  editProfileButton,
  addPictureButton,
  profileImageButton,
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
  popUpEditAvatarElement,
  popupEditAvatarCloseButton,
  popUpEditAvatarOverlay,
  popUpEditAvatarForm,
  popUpEditAvatarLinkInput,
  validationsConstants,
  popUpDeleteCardElement,
  popUpDeleteCardForm,
  popupDeleteCardCloseButton,
  popUpDeleteCardOverlay,
  popUpDeleteCardButton,
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

popupDeleteCardCloseButton.addEventListener('click', () => closePopup(popUpDeleteCardElement));
popUpDeleteCardOverlay.addEventListener('click', () => closePopup(popUpDeleteCardElement.closest('.popup')));

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

profileImageButton.addEventListener('click', () => openPopup(popUpEditAvatarElement));
popupEditAvatarCloseButton.addEventListener('click', () => closeAndClearPopup(
  popUpEditAvatarForm,
  popUpEditAvatarElement,
  [
    popUpEditAvatarLinkInput,
  ],
));
popUpEditAvatarOverlay.addEventListener('click', () => closeAndClearPopup(
  popUpEditAvatarForm,
  popUpEditAvatarElement,
  [
    popUpEditAvatarLinkInput,
  ],
));
popUpEditAvatarForm.addEventListener('submit', updateProfile);

// profileImage.setAttribute('src', kusto);
logoElement.setAttribute('src', logo);

Array.from(mainPageElement.querySelectorAll('.popup')).forEach(el => {
  el.classList.remove('popup_display-none');
})

enableValidation(validationsConstants);

getUserInfo();
getInitialCards();