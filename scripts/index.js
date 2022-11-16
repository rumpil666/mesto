const NameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__about-me');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_name');
const jobInput = formElement.querySelector('.popup__field_about-me');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = NameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
}

 const formSubmitHandler = function (evt) {
  evt.preventDefault();

  NameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup();
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);
