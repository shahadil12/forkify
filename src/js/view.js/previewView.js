import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentEL = '';

  _generateMarkUp() {
    return `
    <li class="preview">
    <a class="preview__link" href="#${this._data.id}">
      <figure class="preview__fig">
        <img src="${this._data.image}" alt="${this._data.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${this._data.title}</h4>
        <p class="preview__publisher">${this._data.publisher}</p>
      </div>
    </a>
    <div>
    ${
      this._data.key
        ? `<div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>`
        : ''
    }
    </div>
  </li>;`;
  }
}

export default new PreviewView();
