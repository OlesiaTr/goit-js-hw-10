// Makes an HTTP request to https://restcountries.com/ and returns a promise with an array of countries
const BASIC_URL = 'https://restcountries.com/v3.1/';
// Field filtering
const fields = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${BASIC_URL}name/${name}?${fields}`)
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(() => {
      throw new Error(response.status);
    });
}
