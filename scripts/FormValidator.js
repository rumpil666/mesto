export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.formInput));
    this._buttonElement = this._formElement.querySelector(this._settings.formSave);
  }

// Добавления класса ошибки
_showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._settings.inputErrorActive);
};

//Удаление класса ошибки
_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._settings.inputErrorClass);
  errorElement.classList.remove(this._settings.inputErrorActive);
  errorElement.textContent = '';
};

//Добавление или удаление текста ошибки
_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

//Функция находит невалидные поля
_hasInvalidInput () {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//Функция активации и деактивации кнопки отправки формы в зависимости от валидности полей
toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._settings.classButton);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classList.remove(this._settings.classButton);
    this._buttonElement.disabled = false;
  }
};

//Функция исполнения обработчиков
_setEventListeners() {

  this.toggleButtonState();

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this.toggleButtonState();
      });
  });

  this._formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this.toggleButtonState();
    }, 0);
  });

};

enableValidation() {
  this._setEventListeners();
};

}
