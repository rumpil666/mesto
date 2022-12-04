import initialCards from "./date.js";

const popupName = document.querySelector('.popup_name');
const popupCard = document.querySelector('.popup_card');
const popupZoomImage = document.querySelector('.popup_zoom-img');

const popupOpenButtonName = document.querySelector('.profile__edit-button');
const popupOpenButtonCard = document.querySelector('.profile__add-button');

const popupCloseButtonName = popupName.querySelector('.popup__close');
const popupCloseButtonCard = popupCard.querySelector('.popup__close');
const popupCloseButtonZoomImage = popupZoomImage.querySelector('.popup__close');


const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about-me');
const formEditProfile = document.querySelector('.popup__form_type_name');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_about-me');

//Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

//Функция заполнения поля информации введными данными
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

const formNameSubmitHandler = function (e) {
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


//Зактрие popup
popupCloseButtonName.addEventListener('click', function () {
  closePopup(popupName);
});
popupCloseButtonCard.addEventListener('click', function () {
  closePopup(popupCard);
});
popupCloseButtonZoomImage.addEventListener('click', function () {
  closePopup(popupZoomImage);
});


const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  event.target.classList.remove('popup_opened');
}

//Функция для закрытия попапа по нажатию 'Esc'
const closePopupByClickEsc = function (event) {
  if (event.key === 'Escape') {
    closePopup(popupName);
    closePopup(popupCard);
    closePopup(popupZoomImage);
  }
}

//Закрытие попапа по нажатию 'Esc'
document.addEventListener('keydown', closePopupByClickEsc);

popupName.addEventListener('click', closePopupByClickOnOverlay);
popupCard.addEventListener('click', closePopupByClickOnOverlay);
popupZoomImage.addEventListener('click', closePopupByClickOnOverlay);


formEditProfile.addEventListener('submit', formNameSubmitHandler);

const cardList = document.querySelector('.elements__list');
const cardTemplate =
  document.querySelector('#card-template').content.querySelector('.element');
const formCard = document.querySelector('.popup__form_type_new-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//Функия для создания новых карточек
function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  const cardImg = card.querySelector('img');
  const cardDeleteButton = card.querySelector('.element__delete');
  const cardLikeButton = card.querySelector('.element__like');

  //Обработчик кликов для кнопок лайка, удаления и открытия попапа увеличения картинки.
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);
  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardImg.addEventListener('click', handleImgClick);

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

function handleImgClick(evt) {
  openPopup(popupZoomImage);
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
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

  titleInput.value = '';
  linkInput.value = '';
}



formCard.addEventListener('submit', handleFormCardSubmit)
