import '../pages/index.css'

import { initialCards, settings, formCard, popupOpenButtonName, popupOpenButtonCard, formEditProfile, nameInput, jobInput } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";


const viewImagePopup = new PopupWithImage('.popup_zoom-img');

const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '#card-template',
    handlCardClick: (name, link) => {
    viewImagePopup.open(name, link);
  }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section({
  items: initialCards,
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__list');

const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__about-me',
});

const popupName = new PopupWithForm({
  popupSelector: '.popup_name',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupName.close();
  },
})

function fillInNameFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

popupOpenButtonName.addEventListener('click', () => {
  popupName.open();
  const info = userInfo.getUserInfo();
  fillInNameFormInputs({ username: info.username, job: info.job });
  formNameInfoValidator.resetValidation();
})

const popupCard = new PopupWithForm({
  popupSelector: '.popup_card',
  handleFormSubmit: (card) => {
    cardsList.addItem(createCard(card));
    popupCard.close();
  },
})

popupOpenButtonCard.addEventListener('click', () => {
  formAddNewCardValidator.resetValidation();
  popupCard.open();
})

viewImagePopup.setEventListeners();
popupName.setEventListeners();
popupCard.setEventListeners();

cardsList.renderItems();


const formNameInfoValidator = new FormValidator(settings, formEditProfile);
formNameInfoValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(settings, formCard);
formAddNewCardValidator.enableValidation();
