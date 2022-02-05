const BASE_URL =
  'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';
const API_KEY = 'ddb3385216bdaa24c159055f7b2937a1';

// Запрос о состоянии погоды в городе

const fetchCity = cityName =>
  fetch(`${BASE_URL}q=${cityName}&appid=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Город с название ${cityName} не найден`));
  });

export default fetchCity;
