function CardCityWeather({ cityWeather: {name, main, wind, weather }}) {
    
  return (
        <div>     
        <div>
          <h2>{name}</h2>
            <p>Температура: {main.temp} °C</p>
            <p>Ощущается как: {main.feels_like} °C</p>
            <p>Ветер: {wind.speed} м/с</p>
            <p>Состояние погоды: {weather[0].description}</p>
           
      </div> 
      <button type="button">Обновить</button>
      <button type="button">Удалить</button>
    </div >
      )
}

  
export default CardCityWeather