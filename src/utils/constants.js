const popupOpenButtonName = document.querySelector('.profile__edit-button');
const popupName = document.querySelector('.popup_name');
const formEditProfile = popupName.querySelector('.popup__form');

const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_about-me');

const popupOpenButtonCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_card');
const formCard = popupCard.querySelector('.popup__form');

const popupBtnAvatar = document.querySelector('.profile__avatar-btn');
const popupAvatar = document.querySelector('.popup_avatar');

const formAvatar = popupAvatar.querySelector('.popup__form');
const avatar = document.querySelector('.profile__avatar');

const settings = {
  popupForm : '.popup__form',
  inputErrorClass : 'popup__input_type_error',
  inputErrorActive : 'popup__input-error_active',
  formInput : '.popup__input',
  formSubmit : '.popup__submit',
  classButton: 'button_inactive',
};

export {popupBtnAvatar, formAvatar, avatar, settings, formCard, popupOpenButtonName, popupOpenButtonCard, formEditProfile, nameInput, jobInput};
