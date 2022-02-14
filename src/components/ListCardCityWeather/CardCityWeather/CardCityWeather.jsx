import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { fetchUpdateWeatherOneCity } from 'redux/cityWeather/cityWeather-operations';
import { remove } from 'redux/cityWeather/cityWeather-actions';
import css from './CardCityWeather.module.css';

function CardCityWeather({
  id,
  name,
  temp,
  feelsLike,
  windSpeed,
  description,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <NavLink to={`/${id}`}>
        <h2 className={css.title}>{name}</h2>
        <p className={css.item_text}>Температура: {temp} °C</p>
        <p className={css.item_text}>Ощущается как: {feelsLike} °C</p>
        <p className={css.item_text}>Ветер: {windSpeed} м/с</p>
        <p className={css.item_text}>Состояние погоды: {description}</p>
      </NavLink>
      <div className={css.button_wrapper}>
        <Button
          variant="outlined"
          type="button"
          sx={{
            color: 'white',
            mr: '25px',
            border: '1px solid white',
          }}
          onClick={() => dispatch(fetchUpdateWeatherOneCity(name))}
        >
          Обновить
        </Button>
        <Button
          variant="outlined"
          type="button"
          sx={{
            color: 'white',
            border: '1px solid white',
          }}
          onClick={() => dispatch(remove(id))}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}

export default CardCityWeather;

CardCityWeather.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  feelsLike: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
