import '../pages/index.css'

import { popupBtnAvatar, formAvatar, avatar, settings, formCard, popupOpenButtonName, popupOpenButtonCard, formEditProfile, nameInput, jobInput } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from "../components/FormValidator.js";
import Api from '../components/Api.js';

// _____________API_____________
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ea831264-f2d6-4316-98fa-307058f19068',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// _____________Функция для добавления новых карточек_____________
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '#card-template',
    userId: userId,
    handlCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteBtnClick: (cardId) => {
      confirmationPopup.open();
      confirmationPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            confirmationPopup.close;
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleSetLikes: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLikes: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

// _____________Создание Section_____________
const cardsList = new Section({
  items: initialCards,
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__list');


// _____________Профиль пользователя_____________

const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__about-me',
  avatar: '.profile__avatar'
});

// _____________Попап редактирования профиля_____________
const popupName = new PopupWithForm({
  popupSelector: '.popup_name',
  handleFormSubmit: (formData) => {
    popupName.loading(true);
    api.editUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        popupName.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupName.loading(false);
      });
  },
})
popupName.setEventListeners();

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

// _____________Попап добавления карточки_____________
const popupCard = new PopupWithForm({
  popupSelector: '.popup_card',
  handleFormSubmit: (formCard) => {
    popupCard.loading(true);
    api.addNewCard(formCard)
      .then((formCard) => {
        cardsList.addItem(createCard(formCard));
        popupCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCard.loading(false);
      });
  },
})
popupCard.setEventListeners();

popupOpenButtonCard.addEventListener('click', () => {
  formAddNewCardValidator.resetValidation();
  popupCard.open();
})

// _____________Попап изменение аватара_____________
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (formData) => {
    popupAvatar.loading(true);
    api.editAvatar(formData)
      .then((formData) => {
        avatar.src = formData.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.loading(false);
      });
  },
})
popupAvatar.setEventListeners();

popupBtnAvatar.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
})

// _____________Попап подтверждения удаления_____________
const confirmationPopup = new PopupWithConfirmation('.element__delete');
confirmationPopup.setEventListeners();

// _____________Попап отображения карточки_____________
const viewImagePopup = new PopupWithImage('.popup_zoom-img');
viewImagePopup.setEventListeners();



cardsList.renderItems();

// _____________Валидация форм_____________
const formNameInfoValidator = new FormValidator(settings, formEditProfile);
formNameInfoValidator.enableValidation();

const formAvatarValidator = new FormValidator(settings, formAvatar);
formAvatarValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(settings, formCard);
formAddNewCardValidator.enableValidation();
