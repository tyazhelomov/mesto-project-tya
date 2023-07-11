import {
  getFormFields,
  clearFields,
  closePopup,
} from "../components/modal";
import {
  popupEditProfileElement,
  profileName,
  profileDescription,
} from "../constants/elements";

export function saveProfileInfo(evt) {
  evt.preventDefault();
  const fields = getFormFields(popupEditProfileElement);

  profileName.textContent = fields.name;
  profileDescription.textContent = fields.description;

  clearFields(popupEditProfileElement);
  closePopup(popupEditProfileElement);
}