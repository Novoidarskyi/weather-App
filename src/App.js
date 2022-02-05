import { Component } from 'react';
import FormFindCity from 'components/FormFindCity';
import ViewCitiesWeather from 'components/ViewCitiesWeather';

export default class App extends Component {
  state = {
    cityName: [],
  };

  handleFormSubmit = cityName => {
    if (this.state.cityName.includes(cityName)) {
      return alert(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }
    this.setState(prevState => ({
      cityName: [cityName, ...prevState.cityName],
    }));
  };

  // handleChangeState = cityName => {

  //   this.setState(prevState => ({
  //     cityName: [cityName, ...prevState.cityName],
  //   }));
  // };

  render() {
    console.log(this.state.cityName);
    return (
      <div>
        <FormFindCity onSubmit={this.handleFormSubmit} />
        <ViewCitiesWeather cityName={this.state.cityName} />
      </div>
    );
  }
}
