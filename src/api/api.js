const BASE_URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';
const TEMP_URL =
  'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=current,minutely,daily,alerts&';
const ID_URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';
const API_KEY = 'c16e47f23c97143fbd5f7a2cbadb0b2f';

// Запрос о состоянии погоды в городе по названию

const fetchCity = cityName =>
  fetch(`${BASE_URL}q=${cityName}&appid=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Город с название ${cityName} не найден`));
  });

// Запрос о состоянии погоды в городе по ID

const fetchCityById = id =>
  fetch(`${ID_URL}id=${id}&appid=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error('Подробная информация о погоде не найдена'),
    );
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

export { fetchCity, fetchByLocalStorage, fetchTemperature, fetchCityById };
