function CardCityWeather({id, name, temp, feelsLike, windSpeed, description, removeCityWeather }) {
    
  return (
        <div>     
        <div>
          <h2>{name}</h2>
            <p>Температура: {temp} °C</p>
            <p>Ощущается как: {feelsLike} °C</p>
            <p>Ветер: {windSpeed} м/с</p>
            <p>Состояние погоды: {description}</p>
           
      </div> 
      <button type="button" >Обновить</button>
      <button type="button" onClick={()=>removeCityWeather(id, name)}>Удалить</button>
    </div >
      )
}

  
export default CardCityWeather