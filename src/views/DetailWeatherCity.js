import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTemperature } from 'api/api';
import { citiesWeatherArray } from 'redux/cityWeather/cityWeather-selectors';
import DetailICityWeatherCard from 'components/DetailICityWeatherCard';
import ChartTemperature from '../components/ChartTemperature';

function DetailWeatherCity() {
  const [temp, setTemp] = useState([]);
  const cityWeather = useSelector(citiesWeatherArray);
  const { cityId } = useParams();
  const city = cityWeather.find(({ id }) => id === Number(cityId));

  const detailTemp = ({ coord: { lat, lon } }) => {
    fetchTemperature(lat, lon)
      .then(setTemp)
      .catch(error => toast.error(error.message));
  };

  const tempOfDayArray = temp.length !== 0 ? temp.hourly.slice(0, 24) : [];
  console.log(tempOfDayArray);

  return (
    <div>
      <button type="button">Назад</button>
      <DetailICityWeatherCard city={city} />
      {
        <button type="button" onClick={() => detailTemp(city)}>
          Подробный прогноз t°C
        </button>
      }
      {tempOfDayArray.length !== 0 && (
        <ChartTemperature value={tempOfDayArray} />
      )}
    </div>
  );
}

export default DetailWeatherCity;
