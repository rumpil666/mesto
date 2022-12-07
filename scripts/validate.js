const settings = {
  popupForm : '.popup__form',
  inputErrorClass : 'popup__input_type_error',
  inputErrorActive : 'popup__input-error_active',
  formInput : '.popup__input',
  formSave : '.popup__save',
  classButton: 'button_inactive',
};



//Функция проверки на валидность всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.popupForm));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

//Функция снятия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = '';
};

//Функция активации и деактивации кнопки отправки формы в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.classButton);
  } else {
    buttonElement.classList.remove(settings.classButton);
  }
};

//Функция добавления всем необходимым полям стилей кнопок
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  const buttonElement = formElement.querySelector(settings.formSave);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputList, buttonElement);
        }, 0);
      });
    });

  });
};

//Функция валидации форм
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция находит невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation();
