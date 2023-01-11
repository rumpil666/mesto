import Card from "./Card.js";
import { initialCards, settings } from "./date.js";
import FormValidator from "./FormValidator.js";


const popupName = document.querySelector('.popup_name');
const popupCard = document.querySelector('.popup_card');
const popupZoomImage = document.querySelector('.popup_zoom-img');

const popupOpenButtonName = document.querySelector('.profile__edit-button');
const popupOpenButtonCard = document.querySelector('.profile__add-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about-me');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_about-me');

//Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEsc);
}

//Функция заполнения поля информации введными данными
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEsc);
}

const handleProfileFormSubmit = function (e) {
  e.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupName);
}

// Открытие Popup
popupOpenButtonName.addEventListener('click', function () {
  openPopup(popupName);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

popupOpenButtonCard.addEventListener('click', function () {
  openPopup(popupCard);
});

const popups = document.querySelectorAll('.popup')

//универсальная функция закрытия попапов по нажатию на кнопку закрытия и оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
})

//Функция для закрытия попапа по нажатию 'Esc'
const closePopupByClickEsc = function (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


formEditProfile.addEventListener('submit', handleProfileFormSubmit);

const cardList = document.querySelector('.elements__list');
const formCard = document.forms['new-card'];
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//Функия для создания новых карточек
function createElement(item) {
  const card = new Card(item, '#card-template', handleImgClick);
  const cardElement = card.generateCard();

  return cardElement;
}




// Элементы и функция для работы всплывания попапа
const popupImg = document.querySelector('.popup__img');
const popupSubtitle = document.querySelector('.popup__subtitle');

function handleImgClick(img, name) {
  openPopup(popupZoomImage);
  popupImg.src = img;
  popupImg.alt = name;
  popupSubtitle.textContent = name;
}

//Функция генерации новых карточек
const renderCard = (item, wrapElemen) => {
  const element = createElement(item);
  wrapElemen.prepend(element);
}

//Функция для автоматического добавления начальных карточек
initialCards.forEach(function (item) {
  renderCard(item, cardList)
});

const handleFormCardSubmit = (evt) => {
  evt.preventDefault()

  // здесь мы сами создаем объект, который будем передавать в renderCard
  const card = {
    name: titleInput.value,
    link: linkInput.value
  }

  renderCard(card, cardList);

  closePopup(popupCard);

  evt.target.reset()
}

formCard.addEventListener('submit', handleFormCardSubmit)


const formAddNewCardValidator = new FormValidator(settings, popupCard);
formAddNewCardValidator.enableValidation();
