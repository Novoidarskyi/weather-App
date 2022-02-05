import { Component } from "react";
// import ListCardCityWeather from "../ListCardCityWeather"
import CardCityWeather from "../ListCardCityWeather/CardCityWeather"
import fetchCity from "../../api/fetchCity"


const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected"
}


class ViewCitiesWeather extends Component {
  state = {
    cityWeather: null,  
    error: null,
    status: STATUS.IDLE,
  }

// Запрос за данными погоды города
  
  componentDidUpdate(prevProps) {
    if (prevProps.cityName !== this.props.cityName) {
      this.setState({ status: STATUS.PENDING})
      fetchCity(this.props.cityName[0])
        .then(cityWeather => this.setState({ cityWeather, status: STATUS.RESOLVED }))     
        .catch(error => this.setState({ error, status: STATUS.REJECTED  }))
        
    }
  }


  render() {
    const { cityWeather, error, status } = this.state;
   

    if (status === "idle") {
      return <div>Введите название города</div>
    }

      if (status === "pending") {
      return <div>Загружаем</div>
    }

     if (status === "rejected") {
      return <h1>{ error.message }</h1>
    }

    if (status === "resolved") {
      return <CardCityWeather cityWeather={ cityWeather}/>
          }
   }
}

export default ViewCitiesWeather;
