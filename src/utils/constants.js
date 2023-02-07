const popupOpenButtonName = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_about-me');

const popupOpenButtonCard = document.querySelector('.profile__add-button');
const formCard = document.forms['new-card'];

const popupBtnAvatar = document.querySelector('.profile__avatar-btn');
const formAvatar = document.forms['popup__form_type_avatar'];
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
