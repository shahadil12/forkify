import View from './View.js';

class AddRecipe extends View {
  _parentEL = document.querySelector('.upload');
  overlay = document.querySelector('.overlay');
  window = document.querySelector('.add-recipe-window');
  btn = document.querySelector('.nav__btn');
  btnClose = document.querySelector('.btn--close-modal');
  message = 'Successfully Added Recipe';

  constructor() {
    super();
    this.showForm();
    this.hideForm();
  }

  formHandler() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }
  showForm() {
    this.btn.addEventListener('click', this.formHandler.bind(this));
  }

  hideForm() {
    this.btnClose.addEventListener('click', this.formHandler.bind(this));
  }

  addRecipeHandler(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipe();
