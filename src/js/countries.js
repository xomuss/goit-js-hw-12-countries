import { debounce } from 'lodash';
import countrieCardTpl from '../templates/countrie-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import countriesList from '../templates/countries-list.hbs';

const refs = getRefs();

let searchQuery = '';

refs.formInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  searchQuery = refs.formInput.value;

  API.fetchCountries(searchQuery).then(renderCountrieCard).catch(fechError);
}

function renderCountrieCard(countries) {
  console.log(countries);
  let numberCountries = countries.length;
  if (numberCountries === 1) {
    const markUp = countrieCardTpl(countries);
    refs.cardContainer.innerHTML = markUp;
  } else if (numberCountries < 10) {
    const markUp = countriesList(countries);
    refs.cardContainer.innerHTML = markUp;
  } else if (numberCountries >= 10) {
    error('Too many matches found. Please enter a more specific query!');
  }
}

function fechError(error) {
  alert('error');
}
