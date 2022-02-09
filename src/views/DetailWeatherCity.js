import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ('http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&');

const API_KEY = '9c806e9725e96dc347fc3814dca6c4a3';

const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=33.44&lon=-94.04&exclude=current,minutely,daily,alerts&appid=${API_KEY}`;

// Запрос о состоянии погоды в городе

const fetchCity = cityName =>
  fetch(`${BASE_URL}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Город с название ${cityName} не найден`));
  });

function DetailWeatherCity() {
  // {
  //   // id,
  //   // name,
  //   // temp,
  //   // feelsLike,
  //   // windSpeed,
  //   // description,
  // },
  const [cityWeather, setCityWeather] = useState([]);

  const a = cityWeather.length !== 0 ? cityWeather.hourly.slice(0, 24) : [];
  console.log(a);
  return (
    <div>
      <div>
        <h2>Это страница подробной погоды</h2>
        <p>Температура: °C</p>
        <p>Ощущается как: °C</p>
        <p>Ветер: м/с</p>
        <p>Состояние погоды: </p>
      </div>
      <button type="button">Вернуться</button>
      <Link to="/detail">
        <button type="button" onClick={() => fetchCity().then(setCityWeather)}>
          Подробный прогноз t°C
        </button>
      </Link>
    </div>
  );
}

export default DetailWeatherCity;
