import { Component } from 'react';
import CityFindForm from 'components/CityFindForm';
// import { useState } from 'react';
// import CityCard from 'components/CityCard';
// import fetchCity from './api/fetchCity';

const BASE_URL =
  'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';
const API_KEY = 'ddb3385216bdaa24c159055f7b2937a1';

export default class App extends Component {
  state = {
    city: 'Berlin',
    cityWeather: null
    loading: false,
  };

  handleFormSubmit = cityName => {
    this.setState({ city: cityName });
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${BASE_URL}q=${this.state.city}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(cityWeather => this.setState({ cityWeather }))
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        <CityFindForm onSubmit={this.handleFormSubmit} />
        {this.state.loading && <div>Загружаем</div>}
        {this.state.city && <div>{this.state.city.name}</div>}
      </div>
    );
  }
}
