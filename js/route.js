import { fetchData, url } from "./api.js";

import { displayForecast } from "./displayForecast.js";

const defaultLocation = { lat: 2.0469, lon: 45.3182 }; // Mogadishu

const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    const location = { latitude, longitude };

    try {
        // Construct the URL for fetching forecast data
        const forecastUrl = url.forecast(latitude, longitude);
        const forecast = await fetchData(forecastUrl);
        
        // Ensure that `forecast` is valid before passing to `displayForecast`
        if (forecast) {
            displayForecast(forecast, location);
        } else {
            console.error("No forecast data returned.");
        }
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
};

const errorCallback = (error) => {
    console.error("Geolocation error:", error);
    // Use default location if geolocation fails
    useDefaultLocation();
};

const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        // Geolocation not supported, use default location
        useDefaultLocation();
    }
};

const useDefaultLocation = async () => {
    try {
        const { lat, lon } = defaultLocation;
        const forecastUrl = url.forecast(lat, lon);
        const forecast = await fetchData(forecastUrl);
        
        // Ensure that `forecast` is valid before passing to `displayForecast`
        if (forecast) {
            displayForecast(forecast, defaultLocation);
        } else {
            console.error("No forecast data returned for default location.");
        }
    } catch (error) {
        console.error("Error fetching forecast data for default location:", error);
    }
};

// Call `getCurrentLocation` on page load
window.onload = () => {
    getCurrentLocation();
};

// Optional: Add an event listener to the current location button
document.getElementById("current-location").addEventListener("click", getCurrentLocation);