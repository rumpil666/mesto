const popupElementName = document.querySelector('.popup_name');
const popupElementCard = document.querySelector('.popup_card');
const popupElementZoomImage = document.querySelector('.popup_zoom-img');

const popupOpenButtonName = document.querySelector('.profile__edit-button');
const popupOpenButtonCard = document.querySelector('.profile__add-button');

const popupCloseButtonName = popupElementName.querySelector('.popup__close');
const popupCloseButtonCard = popupElementCard.querySelector('.popup__close');
const popupCloseButtonZoomImage = popupElementZoomImage.querySelector('.popup__close');


const NameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about-me');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_type_name');
const jobInput = formElement.querySelector('.popup__field_type_about-me');

//Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  nameInput.value = NameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Функция заполнения поля информации введными данными
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

const formSubmitHandler = function (e) {
  e.preventDefault();

  NameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupElementName);
}

// Открытие Popup
popupOpenButtonName.addEventListener('click', function () {
  openPopup(popupElementName);
});
popupOpenButtonCard.addEventListener('click', function () {
  openPopup(popupElementCard);
});

//Зактрие popup
popupCloseButtonName.addEventListener('click', function () {
  closePopup(popupElementName);
});
popupCloseButtonCard.addEventListener('click', function () {
  closePopup(popupElementCard);
});
popupCloseButtonZoomImage.addEventListener('click', function () {
  closePopup(popupElementZoomImage);
});

formElement.addEventListener('submit', formSubmitHandler);

import initialCards from "./date.js";

const cardListElement = document.querySelector('.elements__list');
const cardTemplate =
  document.querySelector('#card-template').content.querySelector('.element');
const formCard = document.querySelector('.popup__form_type_new-card');
const titleInput = document.querySelector('.popup__field_type_title');
const linkInput = document.querySelector('.popup__field_type_link');

//Функия для создания новых карточек
function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  const cardImg = card.querySelector('img');
  const cardDeleteButton = card.querySelector('.element__delete');
  const cardLikeButton = card.querySelector('.element__like');
  const cardPopupButton = card.querySelector('.element__item');

  //Обработчик кликов для кнопок лайка, удаления и открытия попапа увеличения картинки.
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardPopupButton.addEventListener('click', handlePopupButtonClick);

  //Присваивание карточкам ссылки альта и текста из имеющихся у нас данных
  cardTitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;

  return card;
}

//Функция для нажатия лайка
const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

//Функция для удаления карточки
const handleDeleteButtonClick = (evt) => {
  evt.target.closest('.element').remove();
}

// Элементы и функция для работы всплывания попапа
const popupImg = document.querySelector('.popup__img');
const popupSubtitle = document.querySelector('.popup__subtitle');

function handlePopupButtonClick(evt) {
  if (evt.target.classList.contains('element__item')) {
    ;
    popupElementZoomImage.classList.add('popup_opened');
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupSubtitle.textContent = evt.target.alt;
  }
}

//Функция генерации новых карточек
const renderCard = (item, wrapElemen) => {
  const element = createElement(item);
  wrapElemen.prepend(element);
}

//Функция для автоматического добавления начальных карточек
initialCards.forEach(function (item) {
  renderCard(item, cardListElement)
});

const handleFormSubmit = (evt) => {
  evt.preventDefault()

  // здесь мы сами создаем объект, который будем передавать в renderCard
  const card = {
    name: titleInput.value,
    link: linkInput.value
  }

  renderCard(card, cardListElement);

  closePopup(popupElementCard);
}


formCard.addEventListener('submit', handleFormSubmit)
