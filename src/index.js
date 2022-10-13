import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import articlesTpl from './articles.hbs';
import cartTpl from './cart.hbs';

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

function preprocess(r) {
  r.length === 1 && cartInfo(r);
  console.log(r);
}

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
      for (const [key, value] of Object.entries(languages)) {
        console.log(`${key}: ${value}`);
      }
      // return refs.info.insertAdjacentHTML(
      //   'beforeend',
      //   cartTpl({ official, svg, population, languages, capital })
      // );
    }
  );
  // refs.info.insertAdjacentHTML('beforeend', cartMarkup);
}

function clearedMarkup() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
