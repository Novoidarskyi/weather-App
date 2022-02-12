import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {fetchUpdateWeatherOneCity} from 'redux/cityWeather/cityWeather-operations';
import { remove } from "redux/cityWeather/cityWeather-actions"


function CardCityWeather({ id, name, temp, feelsLike, windSpeed, description }) {
  const dispatch = useDispatch()
  return (
        <div>     
        <div>
          <Link to={`${id}`}>
          <h2>{name}</h2>
            <p>Температура: {temp} °C</p>
            <p>Ощущается как: {feelsLike} °C</p>
            <p>Ветер: {windSpeed} м/с</p>
            <p>Состояние погоды: {description}</p>
           </Link>
      </div> 
      <button type="button" onClick={() => dispatch(fetchUpdateWeatherOneCity(name))}>Обновить</button>
      <button type="button" onClick={() => dispatch(remove(id))}>Удалить</button>      
    </div >
      )
}

  
export default CardCityWeather