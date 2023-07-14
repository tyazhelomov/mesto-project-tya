import {
  getFormFields,
  changeButtonText,
} from "../components/modal";
import {
  profileName,
  profileDescription,
  profileImage,
  popupEditProfileElement,
  popUpEditAvatarElement,
  popUpEditAvatarButton,
  popUpEditProfileButton,
} from "../constants/elements";
import {
  patchUserInfo,
  updateUserAvatar,
} from "./api";
import {
  renderCards,
} from '../components/card.js';

export function saveProfileInfo(evt) {
  evt.preventDefault();
  changeButtonText(popUpEditProfileButton, true);
  const fields = getFormFields(popupEditProfileElement);

  const name = fields.name;
  const description = fields.description;

  patchUserInfo(name, description, popupEditProfileElement);
}

export async function updateProfile(evt) {
  evt.preventDefault();
  changeButtonText(popUpEditAvatarButton, true);
  const fields = getFormFields(popUpEditAvatarElement);

  const link = fields.url;
  updateUserAvatar(link, popUpEditAvatarElement);
}

export function loadUserInfo(data) {
  return new Promise((resolve,reject) => {
    if (data.name) {
      profileName.textContent = data.name;
      profileName.onload = resolve;
      profileName.onerror = reject;
    }
    
    if (data.about) {
      profileDescription.textContent = data.about;
      profileDescription.onload = resolve;
      profileDescription.onerror = reject;
    }
    
    if (data.avatar) {
      profileImage.src = data.avatar;
      profileImage.onload = resolve;
      profileImage.onerror = reject;
    }
  })
  .then(() => data._id)
}

export function loadCards(owner, data) {
  data.forEach(item => {
    const name = item.name;
    const link = item.link;
    const id = item._id;
    const likes = item.likes;
    const ownerId = item.owner._id;
  
    renderCards(owner, { name, link, id, likes, ownerId });
  })
}