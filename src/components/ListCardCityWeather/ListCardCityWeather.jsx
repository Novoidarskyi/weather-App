import { useSelector } from 'react-redux';
import {citiesWeatherArray} from "redux/cityWeather/cityWeather-selectors"
import CardCityWeather from './CardCityWeather';
import PropTypes from 'prop-types';


function ListCardCityWeather(){
const cityWeather = useSelector(citiesWeatherArray)
 
  return (
    cityWeather.length > 0 && (<ul>
      {cityWeather.map(({ id, name, main, wind, weather }) => (
        <li key={id}>          
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