"use strict";

const api_key = "f66873c3467442f180eda451dbc27c34";
export const fetchData = async (URL) => {
    try {
        const res = await fetch(`${URL}&appid=${api_key}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        throw error
    }
}

// URLs for API endpoints
export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;
    },
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    },
};