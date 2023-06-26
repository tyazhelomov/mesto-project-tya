const page = document.querySelector('.page')
const editProfileButton = document.querySelector('.profile__edit-profile-button');
const addPictureButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup');
const formCloseElement = formElement.querySelector('.popup__close');
const formAddImageElement = document.querySelector('.popup-add-image');
const formAddImageCloseElement = formAddImageElement.querySelector('.popup__close');
const saveEditButton = formElement.querySelector('.popup__button');
const saveImageButton = formAddImageElement.querySelector('.popup__button');
const cardsContainer = document.querySelector('.cards');

function getProfileText() {
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');

  return {
    profileName,
    profileDescription,
  }
}

function getFormFields(element) {
  return Array.from(element.querySelectorAll('.popup__item'));
}

function clearFields(fields) {
  fields.forEach(item => {
    item.value = '';
  })
}

editProfileButton.addEventListener('click', () => {
  const fields = getFormFields(formElement);
  const { profileName, profileDescription } = getProfileText();

  fields.forEach(item => {
    if (item.name === 'name') {
      item.placeholder = profileName.textContent;
    } else {
      item.placeholder = profileDescription.textContent;
    }
  })

  formElement.classList.add('popup_opened')
});

formCloseElement.addEventListener('click', () => {
  const fields = getFormFields(formElement);
  clearFields(fields);
  formElement.classList.remove('popup_opened')
});

saveEditButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const fields = getFormFields(formElement);
  const { profileName, profileDescription } = getProfileText();
  
  fields.forEach(item => {
    if (item.value.length) {
      if (item.name === 'name') {
        profileName.textContent = item.value;
      } else {
        profileDescription.textContent = item.value;
      }
    }
  })
  clearFields(fields);

  formElement.classList.remove('popup_opened')
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function removeCard(evt) {
  evt.srcElement.parentElement.remove();
}

function closeCard(evt) {
  evt.srcElement.parentElement.parentElement.remove();
}

function showCard(evt) {
  const cardsViewTemplate = document.querySelector('#cards-view-template').content;
  const cardsViewElement = cardsViewTemplate.querySelector('.cards-view').cloneNode(true);
  const cardsViewImage = cardsViewElement.querySelector('.cards-view__image');
  const cardsViewText = cardsViewElement.querySelector('.cards-view__text');
  const cardsViewClose = cardsViewElement.querySelector('.cards-view__close');
  const link = evt.srcElement.currentSrc;
  const name = evt.srcElement.parentElement.textContent;

  cardsViewElement.classList.add('cards-view__opened');
  cardsViewImage.setAttribute('src', link);
  cardsViewImage.setAttribute('alt', name);
  cardsViewText.textContent = name;

  page.prepend(cardsViewElement)

  cardsViewClose.addEventListener('click', closeCard)
}

function addCards(name, link, direction = 'append') {
  const cardsItemTemplate = document.querySelector('#cards__item-template').content;
  const cardsItemElement = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImageElement = cardsItemElement.querySelector('.cards__image');
  const cardTextElement = cardsItemElement.querySelector('.cards__text');
  const likeButton = cardsItemElement.querySelector('.cards__like');
  const removeButton = cardsItemElement.querySelector('.cards__remove');

  cardImageElement.setAttribute('src', link);
  cardImageElement.setAttribute('alt', name);
  cardTextElement.textContent = name;
  
  cardsContainer[direction](cardsItemElement);

  likeButton.addEventListener('click', () => likeButton.classList.toggle('cards__like_active'))
  removeButton.addEventListener('click', removeCard);
  cardImageElement.addEventListener('click', showCard);
}

initialCards.forEach(item => {
  const name = item.name;
  const link = item.link;

  addCards(name, link);
})

function openPopup() {
  formAddImageElement.classList.add('popup_opened')
}

function closePopup() {
  const fields = getFormFields(formAddImageElement);
  clearFields(fields);
  formAddImageElement.classList.remove('popup_opened');
}

function addImage(evt) {
  evt.preventDefault();

  const fields = getFormFields(formAddImageElement);
  const name = fields[0].value;
  const link = fields[1].value;

  if (!name || !link) {
    closePopup();
  } else {
    addCards(name, link, 'prepend');
    closePopup();
  }
}

formAddImageCloseElement.addEventListener('click', closePopup);
addPictureButton.addEventListener('click', openPopup);
saveImageButton.addEventListener('click', addImage);
