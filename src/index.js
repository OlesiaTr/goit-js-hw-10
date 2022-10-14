import './css/styles.css';
import fetchCountries from './js partials/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import articlesTpl from './templates/articles.hbs';
import cartTpl from './templates/cart.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// HTTP requests
function onInput(e) {
  e.preventDefault();
  // Sanitize the entered line using the trim() method
  const name = e.target.value.trim();
  if (name) {
    fetchCountries(name)
      .then(r => preprocess(r))
      .catch(() => Notify.warning('Oops, there is no country with that name'));
  }
  clearedMarkup();
}

// Interface.
function preprocess(r) {
  r.length === 1 && cartInfo(r);
  r.length >= 2 && r.length <= 10 && articlesInfo(r);
  r.length > 10 &&
    Notify.info('Too many matches found. Please enter a more specific name.');
}

// Displays list of found countries, each list item consists of a flag and country name.
function articlesInfo(r) {
  clearedMarkup();
  return r.map(({ flags: { svg }, name: { official } }) =>
    refs.list.insertAdjacentHTML('beforeend', articlesTpl({ svg, official }))
  );
}

//  Displays the card markup with information about the country: flag, name, capital, population and languages.
function cartInfo(r) {
  clearedMarkup();
  return r.map(
    ({
      name: { official },
      flags: { svg },
      population,
      languages,
      capital,
    }) => {
      const languageOptions = [];
      for (const [key, value] of Object.entries(languages)) {
        languageOptions.push(' ' + value);
      }
      return refs.info.insertAdjacentHTML(
        'beforeend',
        cartTpl({ official, svg, population, languageOptions, capital })
      );
    }
  );
}

function clearedMarkup() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
