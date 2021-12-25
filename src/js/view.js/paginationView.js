import icons from 'url:../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
  _parentEL = document.querySelector('.pagination');

  addHandlerPage(handler) {
    this._parentEL.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const maxPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && maxPage > 1) {
      return `<button data-goto='${
        curPage + 1
      }'class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>`;
    }

    if (curPage < maxPage) {
      return `<button  data-goto='${
        curPage + 1
      }'class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>

      <button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button> 
    `;
    }

    if (curPage === maxPage) {
      return `<button  data-goto='${
        curPage - 1
      }'class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;
    }
  }
}

export default new paginationView();
