import previewView from './previewView.js';
import View from './View.js';

class ResultsView extends View {
  _parentEL = document.querySelector('.results');
  errorMessage = 'No recipes found';
  message = '';

  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
