import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector("#search-box");

countryInput.addEventListener("input", debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(){}
