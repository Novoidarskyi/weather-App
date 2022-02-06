import fetchCity from "../../api/fetchCity"
import CardCityWeather from './CardCityWeather';

function ListCardCityWeather({
  cityWeather,
  updateStateCityWeatherAfterRemove, 
  updateStateCityWeatherToOneCity 
})

{
    const removeCityWeather = (removeId, removeCityName) =>
    updateStateCityWeatherAfterRemove(removeId, removeCityName);
 
  const updateOneCityWeather = (name) => { 
    fetchCity(name)
    .then(data => updateStateCityWeatherToOneCity(data))

  }

  return (
    <ul>
      {cityWeather.map(({ id, name, main, wind, weather }) => (
        <li key={id}>
          <CardCityWeather
            id={id}
            name={name}
            temp={main.temp}
            feelsLike={main.feels_like}
            windSpeed={wind.speed}
            description={weather[0].description}
            removeCityWeather={removeCityWeather}
            updateOneCityWeather={updateOneCityWeather }
          />
        </li>
      ))}
    </ul>
  );
}

export default ListCardCityWeather;
