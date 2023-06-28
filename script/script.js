const mainPageElement = document.querySelector('.page')

const editProfileButton = mainPageElement.querySelector('.profile__edit-profile-button');
const addPictureButton = mainPageElement.querySelector('.profile__add-button');
const cardsContainer = mainPageElement.querySelector('.cards');
const cardsItemTemplate = mainPageElement.querySelector('#cards__item-template').content;

const profileElement = mainPageElement.querySelector('.profile__info');
const profileName = profileElement.querySelector('.profile__name');
const profileDescription = profileElement.querySelector('.profile__description');

const popupEditProfileElement = mainPageElement.querySelector('.popup_profile');
const popupEditProfileForm = popupEditProfileElement.querySelector('.popup__form');
const popupCloseEditProfileElement = popupEditProfileElement.querySelector('.popup__close');

const popupAddImageElement = mainPageElement.querySelector('.popup_image');
const popupAddImageForm = popupAddImageElement.querySelector('.popup__form');
const popupCloseAddImageElement = popupAddImageElement.querySelector('.popup__close');

const popupViewElement = mainPageElement.querySelector('.popup_view');
const popupViewImage = popupViewElement.querySelector('.cards-view__image');
const popupViewText = popupViewElement.querySelector('.cards-view__text');
const popupViewCloseButton = popupViewElement.querySelector('.popup__close');

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

function saveProfileInfo(evt) {
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

function removeCard(evt) {
  evt.srcElement.closest('.cards__item').remove();
}

function showCard(link, name) {
  popupViewImage.setAttribute('src', link);
  popupViewImage.setAttribute('alt', name);
  popupViewText.textContent = name;

  openPopup(popupViewElement);
}

function renderCards(cardData) {
  const card = createCards(cardData);
  
  cardsContainer.prepend(card);
}

function createCards(cardData) {
  const {
    name,
    link,
  } = cardData;

  const cardsItemElement = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImageElement = cardsItemElement.querySelector('.cards__image');
  const cardTextElement = cardsItemElement.querySelector('.cards__text');
  const likeButton = cardsItemElement.querySelector('.cards__like');
  const removeButton = cardsItemElement.querySelector('.cards__remove');

  cardImageElement.setAttribute('src', link);
  cardImageElement.setAttribute('alt', name);
  cardTextElement.textContent = name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('cards__like_active'))
  removeButton.addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', evt => {
    const link = evt.srcElement.currentSrc;
    const name = evt.srcElement.closest('.cards__item').textContent;

    showCard(link, name)
  });

  return cardsItemElement;
}

function addImage(evt) {
  evt.preventDefault();

  const fields = getFormFields(popupAddImageElement);
  let name;
  let link;

  fields.forEach(el => {
    if (el.className.includes('popup__item_name')) {
      name = el.value;
    } else if (el.className.includes('popup__item_link')) {
      link = el.value
    }
  })

  if (!name || !link) {

    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  } else {
    renderCards({ name, link });
    clearFields(popupAddImageElement);
    closePopup(popupAddImageElement);
  }
}

initialCards.forEach(item => {
  const name = item.name;
  const link = item.link;

  renderCards({ name, link });
})

Array.from(mainPageElement.querySelectorAll('.popup')).forEach(el => {
  el.classList.remove('popup_display-none');
})

editProfileButton.addEventListener('click', openProfilePopup);
popupCloseEditProfileElement.addEventListener('click', () => {
  clearFields(popupEditProfileElement);
  closePopup(popupEditProfileElement);
});

popupEditProfileForm.addEventListener('submit', saveProfileInfo);
popupViewCloseButton.addEventListener('click', () => closePopup(popupViewElement));

popupCloseAddImageElement.addEventListener('click', () => {
  clearFields(popupAddImageElement);
  closePopup(popupAddImageElement);
});
addPictureButton.addEventListener('click', () => openPopup(popupAddImageElement));
popupAddImageForm.addEventListener('submit', addImage);
