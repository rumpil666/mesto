import '../pages/index.css'

import { popupBtnAvatar, settings, popupOpenButtonName, popupOpenButtonCard } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// _____________API_____________
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ea831264-f2d6-4316-98fa-307058f19068',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// _____________Профиль пользователя_____________

const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__about-me',
  avatar: '.profile__avatar'
});

// _____________Функция для добавления новых карточек_____________
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '.template-selector',
    userId: userInfo.getUserId(data),
    handlCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteBtnClick: (cardId) => {
      confirmationPopup.open();
      confirmationPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            confirmationPopup.close();
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
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__list');




// _____________Попап редактирования профиля_____________
const popupName = new PopupWithForm({
  popupSelector: '.popup_name',
  handleFormSubmit: (data) => {
    popupName.renderLoading(true);
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupName.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupName.renderLoading(false);
      });
  }
});
popupName.setEventListeners();

popupOpenButtonName.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupName.setInputValues(info);
  popupName.open();
})

// _____________Попап добавления карточки_____________
const popupCard = new PopupWithForm({
  popupSelector: '.popup_card',
  handleFormSubmit: (data) => {
    popupCard.renderLoading(true);
    api.addNewCard(data)
      .then((data) => {
        cardsList.addItem(createCard(data));
        popupCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCard.renderLoading(false);
      });
  }
});
popupCard.setEventListeners();


popupOpenButtonCard.addEventListener('click', () => {
  formValidators['new-card'].resetValidation();
  popupCard.open();
})



// _____________Попап изменение аватара_____________
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (data) => {
    popupAvatar.renderLoading(true);
    api.editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  },
})

popupBtnAvatar.addEventListener('click', () => {
  formValidators['avatar'].resetValidation();
  popupAvatar.open();
})
popupAvatar.setEventListeners();



// _____________Попап подтверждения удаления_____________
const confirmationPopup = new PopupWithConfirmation({
  popupSelector: '.popup_delete-card'
});
confirmationPopup.setEventListeners();

// _____________Попап отображения карточки_____________
const viewImagePopup = new PopupWithImage('.popup_zoom-img');
viewImagePopup.setEventListeners();



const formValidators = {}

// _____________Валидация форм_____________
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.popupForm))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(settings);




