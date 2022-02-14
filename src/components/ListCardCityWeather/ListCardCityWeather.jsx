import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {citiesWeatherArray} from "redux/cityWeather/cityWeather-selectors"
import CardCityWeather from './CardCityWeather';
import css from './ListCardCityWeather.module.css';


function ListCardCityWeather(){
const cityWeather = useSelector(citiesWeatherArray)
 
  return (
    cityWeather.length > 0 && (<ul className={css.listCard}>
      {cityWeather.map(({ id, name, main, wind, weather }) => (
        <li key={id} className={css.item}>          
          <CardCityWeather
            id={id}
            name={name}
            temp={main.temp}
            feelsLike={main.feels_like}
            windSpeed={wind.speed}
            description={weather[0].description}       
            />            
        </li>
      ))}
    </ul>)
  );
}

export default ListCardCityWeather;


ListCardCityWeather.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  main: PropTypes.object,
  wind: PropTypes.object,
  weather: PropTypes.array,  
}