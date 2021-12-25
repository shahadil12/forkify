import View from './View.js';
class SearchView {
  _parentEL = document.querySelector('.search');

  _clear() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clear();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
