import * as module from './module.js'

const selectedLoc = document.getElementById("location-title");
const cardsEL = document.getElementById("cards");

export const displayForecast = (forecast, location) => {
  // Check if the forecast and city data are present
  if (!forecast.list || forecast.list.length === 0 || !forecast.city) {
    console.error("No forecast data available");
    return;
  }

  // Users selected location
  selectedLoc.innerHTML = `
    <i class="fa-solid fa-location-dot" style="font-size: 2rem;"></i>
    <h2 id="selected-location-name">${location.name || forecast.city.name}, ${
    location.country || forecast.city.country
  }</h2>
  `;

  // Display today's forecast
  const todayForecast = forecast.list[0];

  const {
    weather,
    dt: dateUnix,
    main: { temp, feels_like, humidity },
    clouds: { all },
    wind: { deg: windDirection, speed: windSpeed },
  } = todayForecast;
  const { icon, description, main } = weather[0];
  const formattedDate = new Date(dateUnix * 1000);

  cardsEL.innerHTML = "";

  if (todayForecast) {
    const firstCard = document.createElement("div");
    firstCard.classList.add("card", "search-result");

    firstCard.innerHTML = `
       <img class="weather-img" src="assets/weather-icons/${icon}.png" alt="${description}" />
      <div class="card__content flex">
      <div class="day-div"
        <h3 class="day">
          Today <span class="degree">${parseInt(temp)}&degC</span>
        </h3>
        </div>
        <div class="weather-info flex">
          <span><i class="fa-regular fa-calendar"></i>${module.formatDate(
            formattedDate
          )}</span>
          <span><i class="fa-solid fa-wind"></i>${parseInt(
            module.mps_to_kmh(windSpeed)
          )} km/h</span>
          <span>Feels like: ${parseInt(feels_like)}&degC</span>
          <span>Humidity: ${parseInt(humidity)}%</span>
          <span>${main}</span>
        </div>
      </div>
    `;

    cardsEL.appendChild(firstCard);
  } else {
  }

  // Display 5-day forecast cards
  for (let i = 7; i < forecast.list.length; i += 8) {
    const weekForecast = forecast.list[i];
    const {
      weather,
      dt: dateUnix,
      main: { temp, feels_like, humidity },
      clouds: { all },
      wind: { deg: windDirection, speed: windSpeed },
    } = weekForecast;
    const { icon, description, main } = weather[0];
    const formattedWeekDate = new Date(dateUnix * 1000);
    const weekDayName = module.getDayName(formattedWeekDate);

    const weekCard = document.createElement("div");
    weekCard.classList.add("card", "search-result");

    weekCard.innerHTML = `'
       <img class="weather-img" src="assets/weather-icons/${icon}.png" alt="${description}" />
      <div class="card__content flex">
      <div class="day-div"
        <h3 class="day">
          ${weekDayName} <span class="degree">  ${parseInt(temp)}&degC</span>
        </h3>
        </div>
        <div class="weather-info flex">
          <span><i class="fa-regular fa-calendar"></i>${module.formatDate(
            formattedDate
          )}</span>
          <span><i class="fa-solid fa-wind"></i>${parseInt(
            module.mps_to_kmh(windSpeed)
          )} km/h</span>
          <span>Feels like: ${parseInt(feels_like)}&degC</span>
          <span>Humidity: ${parseInt(humidity)}%</span>
          <span>${main}</span>
        </div>
      </div>
    `;

    cardsEL.appendChild(weekCard);
  }
};
