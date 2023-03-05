import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

countryInput.addEventListener("input", debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    const country = e.target.value.trim();

    if (country === "") {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
        return;
    }

    fetchCountries(country)
        .then(renderCountryInfo)
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}
function renderCountryInfo(country) {
    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = "";
    }
    const markup = country
        .map(({ name, capital, population, flags, languages }) => {
            return `<img src="${flags.svg}" alt="${name.official}" width="30px">
        <h1 class="official-name">${name.official}</h1>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
        })
        .join("");
    countryInfo.innerHTML = markup;
    if (country.length > 1) {
        countryInfo.innerHTML = "";
    }
    renderCountryList(country);
}
function renderCountryList(country) {
    if (country.length >= 2 && country.length <= 10) {
        const markup = country.map(({ name, flags }) => {
            return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="30px">
        <p class="official-name"><b>${name.official}</b>
    </li>`;
        })
            .join('');
        countryList.innerHTML = markup;
    }
    if (country.length === 1) {
        countryList.innerHTML = "";
    }
}
