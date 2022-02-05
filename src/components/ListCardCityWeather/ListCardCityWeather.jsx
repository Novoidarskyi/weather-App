import CardCityWeather from "./CardCityWeather"

function ListCardCityWeather({ cityWeather }) {
  
   return (
      
    <ul>
        {cityWeather.map(({id, name, main, wind, weather }) => (<li key={id} >          
          <CardCityWeather 
            name={name}
            temp={main.temp}
            feelsLike={main.feels_like}
            windSpeed={wind.speed}
            description={weather[0].description}
          />
      </li>)) }
</ul>

  )
}




export default ListCardCityWeather