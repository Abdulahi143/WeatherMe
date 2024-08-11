import * as module from "./module.js";

import { handleSearch } from "./handleSearch.js";

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchInput = document.querySelector("[data-search-field]");

const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchInput.addEventListener("input", () => {
  const inputValue = searchInput.value.trim();
  clearTimeout(searchTimeout);

  if (!inputValue) {
    searchView.classList.remove("active");
    document.querySelector("[data-search-result]").innerHTML = "";
  } else {
    searchTimeout = setTimeout(() => {
      handleSearch(inputValue);
    }, searchTimeoutDuration);
  }
});
