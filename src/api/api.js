const BASE_URL =
  'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';
const TEMP_URL =
  'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=current,minutely,daily,alerts&';
const API_KEY = 'ddb3385216bdaa24c159055f7b2937a1';

// Запрос о состоянии погоды в городе

const fetchCity = cityName =>
  fetch(`${BASE_URL}q=${cityName}&appid=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Город с название ${cityName} не найден`));
  });

// Запрос о состоянии погоды в город(ах) сохраненных в localStorage

const fetchByLocalStorage = async arrayOfCities => {
  const arrayOfPromises = arrayOfCities.map(async cityName => {
    const response = await fetch(`${BASE_URL}q=${cityName}&appid=${API_KEY}`);
    return response.json();
  });

  const arrayOfWeather = await Promise.all(arrayOfPromises);
  return arrayOfWeather;
};

// Запрос почасовых показателей температуры

const fetchTemperature = (lat, lon) =>
  fetch(`${TEMP_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Данные о температуре не найдены`));
  });

export { fetchCity, fetchByLocalStorage, fetchTemperature };
