import PropTypes from 'prop-types';

const windDirection = data => {
  if (data === 360) {
    return 'северный';
  } else if (0 <= data && data < 90) {
    return 'северо-восточный';
  } else if (data === 90) {
    return 'восточный';
  } else if (90 <= data && data < 180) {
    return 'юго-восточный';
  } else if (data === 180) {
    return 'южный';
  } else if (180 <= data && data < 270) {
    return 'юго-западный';
  } else if (data === 270) {
    return 'западный';
  } else if (270 <= data && data < 360) {
    return 'северо-западный';
  }
};

function DetailWeatherCity({ city }) {
  const {
    name,
    visibility,
    weather,
    wind: { speed, deg },
    main: { temp, feels_like, humidity, pressure, temp_max, temp_min },
  } = city;
  
  const windDir = windDirection(deg);
  
  return (
    <div>
      <h2>{name}</h2>
      <p>Температура: {temp} °C</p>
      <p>Ощущается как: {feels_like} °C</p>
      <p>Ветер: {speed} м/с ({windDir})</p>
      <p>Влажность: {humidity}%</p>
      <p>Давление: {pressure} мм рт. ст.</p>
      <p>Видимость: {visibility} м</p>
      <p>Состояние погоды: {weather[0].description}</p>
      <p>Максимальная температура: {temp_max}°C</p>
      <p>Минимальная температура: {temp_min}°C</p>
    </div>
  );
}

export default DetailWeatherCity;

DetailWeatherCity.propTypes = {
  city: PropTypes.object.isRequired
}