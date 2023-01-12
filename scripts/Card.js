export default class Card {
  constructor(data, templateSelector, handleImgClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImgClick = handleImgClick;
  }

  // Получение шаблона карточки
  _getTemplate() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')//мб ошибка
      .cloneNode(true);

    return this._card;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__item');

    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButtonn = this._element.querySelector('.element__delete');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();


    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleImgClick(this._link, this._name);
    });

    this._deleteButtonn.addEventListener('click', () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like_active')
  }
}


