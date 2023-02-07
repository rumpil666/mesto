import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form_type_delete-card');
  }

  submitCallback(removing) {
    this._handleSubmit = removing;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListenet('click', (e) => {
      preventDefault(e);
      this._handleSubmit;
    })
  }
}
