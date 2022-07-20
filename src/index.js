import './css/styles.css';
import countryList from './templates/country-list.hbs';
import countryInfo from './templates/country-info.hbs';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');
const divEl = document.querySelector('div');

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler() {
  let inputCountry = inputEl.value.trim();

  if (inputCountry === '') {
    listEl.innerHTML = '';
    divEl.innerHTML = '';
    return;
  }

  fetchCountries(inputCountry)
    .then(resultMarkup)
    .catch(err => {
      console.log(err);
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryCard(country) {
  const markup = countryInfo(country[0]);
  listEl.innerHTML = '';
  divEl.innerHTML = markup;
}

function renderCountryList(country) {
  const markup = countryList(country);
  listEl.innerHTML = markup;
  divEl.innerHTML = '';
}

function resultMarkup(result) {
  if (result.length > 10) {
    return Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (result.length >= 2 && result.length <= 10) {
    return renderCountryList(result);
  } else if (result.length === 1) {
    return renderCountryCard(result);
  }
}
