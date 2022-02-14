import PropTypes from 'prop-types';
import css from './DetailICityWeatherCard.module.css';

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
      <h2 className={css.title}>{name}</h2>
      <ul className={css.list}>
      <li className={css.item_text}>Температура: {temp} °C</li>
      <li className={css.item_text}>Ощущается как: {feels_like} °C</li>
      <li className={css.item_text}>Ветер: {speed} м/с ({windDir})</li>
      <li className={css.item_text}>Влажность: {humidity}%</li>
      <li className={css.item_text}>Давление: {pressure} мм рт. ст.</li>
      <li className={css.item_text}>Видимость: {visibility} м</li>
            <li className={css.item_text}>Максимальная температура: {temp_max} °C</li>
      <li className={css.item_text}>Минимальная температура: {temp_min} °C</li>
      <li className={css.item_text}>Состояние погоды: {weather[0].description}</li>
    </ul>
    </div>
  );
}

export default DetailWeatherCity;

DetailWeatherCity.propTypes = {
  city: PropTypes.object.isRequired
}

