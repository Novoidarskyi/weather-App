import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { citiesWeatherArray } from 'redux/cityWeather/cityWeather-selectors';
import DetailICityWeatherCard from 'components/DetailICityWeatherCard';

function DetailWeatherCity() {
  const cityWeather = useSelector(citiesWeatherArray);
  const { cityId } = useParams();
  const city = cityWeather.find(({ id }) => id === Number(cityId));

  // const a = cityWeather.length !== 0 ? cityWeather.hourly.slice(0, 24) : [];
  console.log(cityId);

  return (
    <div>
      <button type="button">Назад</button>
      <DetailICityWeatherCard city={city} />
      <button type="button">Подробный прогноз t°C</button>
    </div>
  );
}

export default DetailWeatherCity;
