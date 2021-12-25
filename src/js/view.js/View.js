import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    const markUp = this._generateMarkUp();
    if (!render) return markUp;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEL.querySelectorAll('*'));

    newElements.forEach((newEL, i) => {
      const curEl = curElements[i];
      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEL.textContent;
      }
      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEL.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `<div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div> `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markUp);
  }
  renderErrorMessage(message = this.errorMessage) {
    const markUp = ` <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>No recipes found for your query. Please try again!</p>
  </div>`;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this.message) {
    const markUp = ` <div class="message">
    <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    this._parentEL.insertAdjacentHTML('afterbegin', markUp);
  }
}
