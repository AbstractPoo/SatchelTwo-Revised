const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDay(date) {
  return weekdays[date.getDay()];
}

export function getDate(date) {
  return date.getDate();
}

export function getMonth(date) {
  return months[date.getMonth()];
}
