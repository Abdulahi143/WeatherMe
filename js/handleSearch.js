import { displayForecast } from "./displayForecast.js";
import { fetchData } from "./api.js";
import { url } from "./api.js";

const searchInput = document.querySelector("[data-search-field]");
const searchView = document.querySelector("[data-search-view]");

export const handleSearch = async (query) => {
  try {
    const locations = await fetchData(url.geo(query));
    if (locations && locations.length > 0) {
      displaySuggestions(locations);
    } else {
      displaySuggestions([]);
    }
  } catch (error) {
    console.error("Search handling error:", error);
  }
};

const displaySuggestions = (locations) => {
  const searchResult = document.querySelector("[data-search-result]");

  searchResult.innerHTML = `
          <ul class="view-list" data-search-list></ul>
      `;

  if (locations.length === 0) {
    searchResult.querySelector("[data-search-list]").innerHTML =
      "<li>No locations found</li>";
    return;
  }

  locations.forEach(({ name, lat, lon, country, state }) => {
    const searchItem = document.createElement("li");
    searchItem.classList.add("view-item");

    searchItem.innerHTML = `
              <div>
                  <p class="item-title">${name}</p>
                  <p class="label-2 item-subtitle">${state || ""} ${country}</p>
              </div>
              <a href="#" class="item-link" aria-label="${name} weather" data-lat="${lat}" data-lon="${lon}"></a>
          `;

    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
  });

  const links = searchResult.querySelectorAll(".item-link");
  links.forEach((link) => {
    link.addEventListener("click", async function (e) {
      e.preventDefault();

      const lat = this.getAttribute("data-lat");
      const lon = this.getAttribute("data-lon");
      const name = this.closest("li").querySelector(".item-title").textContent;
      const country =
        this.closest("li").querySelector(".item-subtitle").textContent;

      searchInput.value = name;

      try {
        const forecast = await fetchData(url.forecast(lat, lon));
        displayForecast(forecast, { name, country });
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }

      searchView.classList.remove("active");
      searchResult.innerHTML = "";
    });
  });

  searchResult.classList.add("active");
};
