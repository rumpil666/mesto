import initialCards from "./date.js";

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
}

//Функция заполнения поля информации введными данными
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
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

//Закрытие попапа по нажатию 'Esc'
document.addEventListener('keydown', closePopupByClickEsc);


formEditProfile.addEventListener('submit', handleProfileFormSubmit);

const cardList = document.querySelector('.elements__list');
const cardTemplate =
  document.querySelector('#card-template').content.querySelector('.element');
const formCard = document.forms['new-card'];
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
  cardImg.addEventListener('click', () => handleImgClick(item));

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

function handleImgClick(item) {
  openPopup(popupZoomImage);
  popupImg.src = item.link
  popupImg.alt = item.name;
  popupSubtitle.textContent = item.name;
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
