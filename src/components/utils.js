import { popupEditProfileElement } from "../script/script";

export function saveProfileInfo(evt) {
  evt.preventDefault();
  const fields = getFormFields(popupEditProfileElement);
  
  fields.forEach(item => {
    if (item.value.length) {
      if (item.name === 'name') {
        profileName.textContent = item.value;
      } else {
        profileDescription.textContent = item.value;
      }
    }
  })

  clearFields(popupEditProfileElement);
  closePopup(popupEditProfileElement);
}