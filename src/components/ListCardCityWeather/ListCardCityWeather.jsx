import CardCityWeather from './CardCityWeather';

function ListCardCityWeather({
  cityWeather,
  updateStateCityWeatherAfterRemove,
  
  
}) {
  const removeCityWeather = (removeId, removeCityName) =>
    updateStateCityWeatherAfterRemove(removeId, removeCityName);


  

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
          />
        </li>
      ))}
    </ul>
  );
}

export default ListCardCityWeather;
