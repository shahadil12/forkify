import previewView from './previewView.js';
import View from './View.js';

class BookmarkView extends View {
  _parentEL = document.querySelector('.bookmarks__list');
  errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it';
  message = '';

  addHandlerRander(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
