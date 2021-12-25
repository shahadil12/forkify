import * as model from './model.js';
import recipeView from './view.js/recipeView.js';
import searchView from './view.js/searchView.js';
import resultsView from './view.js/resultsView';
import bookmarkView from './view.js/bookmarkView.js';
import paginationView from './view.js/paginationView.js';
import addRecipe from './view.js/addRecipe.js';
import { API_URL } from './config';
import { getJson } from './config';

import 'core-js/stable';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';
import bookmarkView from './view.js/bookmarkView.js';

if (module.hot) {
  module.hot.accept();
}
// https://forkify-api.herokuapp.com/v2
// API key
// bba6aa46-d551-49d1-8c96-be2353527936
//5ed6604591c37cdc054bc886

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Get id
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // loadRecipe
    await model.loadRecipe(id);

    //renderRecipe
    recipeView.render(model.state.recipe);

    // controlServings();
  } catch (err) {
    console.log(err);
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // Get query
    const query = searchView.getQuery();

    if (!query) return;
    resultsView.renderSpinner();
    // load search results
    await model.loadSearchResults(query);
    // render search results
    resultsView.render(model.getResultsPerPage(4));
    // render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  // render new search results
  resultsView.render(model.getResultsPerPage(gotoPage));
  // render new pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update data
  model.updateServings(newServings);
  // update view
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmark);
};

const controlAddBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddrecipe = async function (data) {
  try {
    addRecipe.renderSpinner();

    await model.addRecipe(data);

    recipeView.render(model.state.recipe);

    addRecipe.renderMessage();

    bookmarkView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    addRecipe.formHandler();
  } catch (error) {
    recipeView.renderErrorMessage('Not able to upload recipe');
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  bookmarkView.addHandlerRander(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPage(controlPagination);
  addRecipe.addRecipeHandler(controlAddrecipe);
};
init();
