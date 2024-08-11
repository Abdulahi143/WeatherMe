'use strict'

export const weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];



export const mps_to_kmh = mps => {
    const mph = mps * 3600;
    return mph / 1000;
}


// Function to format date as "11 Aug"
export const formatDate = (date) => {
  const day = date.getDate(); // Get day of the month
  const monthIndex = date.getMonth(); // Get month index
  return `${day} ${monthNames[monthIndex]}`;
};

export const getDayName = (date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};