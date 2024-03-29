import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
      this._submitButton = this._popup.querySelector('.popup__submit');
      this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
      });
      return this._formValues
    }

    setEventListeners() {
      super.setEventListeners()
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        this._handleFormSubmit(this._getInputValues())
      })
    }

    setInputValues(data) {
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    }

    close() {
      this._popupForm.reset();
      super.close();
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      } else {
        this._submitButton.textContent = this._submitButtonText;
      }
    }
  }
