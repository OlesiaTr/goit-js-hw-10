import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// HTTP requests
function onInput(e) {
  e.preventDefault();
  // Sanitize the entered line using the trim() method
  const name = e.target.value.trim();
  fetchCountries(name);
}
