export default class Card {
  constructor({data, templateSelector, userId, handlCardClick, handleDeleteBtnClick, handleSetLikes, handleRemoveLikes }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleSetLikes = handleSetLikes;
    this._handleRemoveLikes = handleRemoveLikes;
  }


  _getTemplate() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return this._card;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__item');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesNumber = this._element.querySelector('.element__likes-number');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likesNumber = this._likes.length;

    this._hasDeleteButton;
    this._isCardLiked;
    this._setEventListeners();

    return this._element;
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId = user._id;
    } )) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like_active')
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _hasDeleteButton() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteBtnClick(this._cardId);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleRemoveLikes(userId);
      } {
        this._handleSetLikes(userId);
      }
    });
  }

}


