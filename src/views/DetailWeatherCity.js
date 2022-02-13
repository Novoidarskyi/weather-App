import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTemperature, fetchCityById } from 'api/api';
import { citiesWeatherArray } from 'redux/cityWeather/cityWeather-selectors';
import DetailICityWeatherCard from 'components/DetailICityWeatherCard';
import ChartTemperature from 'components/ChartTemperature';
import GoBackButton from 'components/GoBackButton';

function DetailWeatherCity() {
  const [temp, setTemp] = useState([]);
  const [visible, setVisible] = useState(true);
  const weatherCitiesFromRedux = useSelector(citiesWeatherArray);
  const [allCitiesWeather, setAllCitiesWeather] = useState([]);
  const { cityId } = useParams();

  // Запрос на погоду города по ID при загрузке страницы не из главной
  useEffect(() => {
    if (weatherCitiesFromRedux.length === 0 && allCitiesWeather.length === 0)
      fetchCityById(cityId)
        .then(data => setAllCitiesWeather([data, ...allCitiesWeather]))
        .catch(error => toast.error(error.message));
  }, [allCitiesWeather, cityId, weatherCitiesFromRedux.length]);

  const city =
    weatherCitiesFromRedux.length !== 0
      ? weatherCitiesFromRedux.find(({ id }) => id === Number(cityId))
      : allCitiesWeather[0];

  // Запрос на получение значений температуры по координатам города
  const detailTemp = ({ coord: { lat, lon } }) => {
    fetchTemperature(lat, lon)
      .then(setTemp)
      .catch(error => toast.error(error.message));
  };

  // Получение значений температуры по координатам города за 24 часа
  const tempOfDayArray = temp.length !== 0 ? temp.hourly.slice(0, 24) : [];

  return (
    <div>
      <GoBackButton />
      {city && city.length !== 0 && <DetailICityWeatherCard city={city} />}
      {visible && (
        <button
          type="button"
          onClick={() => {
            detailTemp(city);
            setVisible(!visible);
          }}
        >
          Подробный прогноз t°C
        </button>
      )}
      {!visible && <ChartTemperature value={tempOfDayArray} />}
    </div>
  );
}

export default DetailWeatherCity;
