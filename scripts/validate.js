//Функция проверки на валидность всех форм
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.popupForm));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(settings, formElement);
  });
};

const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

//Функция снятия ошибки
const hideInputError = (settings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = '';
};

//Функция активации и деактивации кнопки отправки формы в зависимости от валидности полей
const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.classButton);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.classButton);
    buttonElement.disabled = false;
  }
};

//Функция добавления всем необходимым полям стилей кнопок
const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  const buttonElement = formElement.querySelector(settings.formSave);

  toggleButtonState(settings, inputList, buttonElement);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(settings, inputList, buttonElement);
    }, 0);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
      });


  });
};

//Функция валидации форм
const checkInputValidity = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(settings, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

//Функция находит невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation({
  popupForm : '.popup__form',
  inputErrorClass : 'popup__input_type_error',
  inputErrorActive : 'popup__input-error_active',
  formInput : '.popup__input',
  formSave : '.popup__save',
  classButton: 'button_inactive',
});
