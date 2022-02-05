import { Component } from 'react';
import { Puff } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';
import FormFindCity from 'components/FormFindCity';
import ListCardCityWeather from './components/ListCardCityWeather';
import fetchCity from './api/fetchCity';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    cityName: [],
    cityWeather: [],
    error: null,
    status: STATUS.IDLE,
  };

  handleFormSubmit = cityName => {
    if (this.state.cityName.includes(cityName)) {
      return alert(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }

    this.setState({ status: STATUS.PENDING });
    fetchCity(cityName)
      .then(cityWeather =>
        this.setState(
          { status: STATUS.RESOLVED },
          this.changeStateCityNameValue(cityWeather),
          this.changeStateCityWeatherValue(cityWeather),
        ),
      )
      .catch(error =>
        this.setState({
          error,
          status: STATUS.REJECTED,
        }),
      );
  };

  changeStateCityWeatherValue = cityWeather =>
    this.setState(prevState => ({
      cityWeather: [cityWeather, ...prevState.cityWeather],
    }));

  changeStateCityNameValue = ({ name }) =>
    this.setState(prevState => ({
      cityName: [name, ...prevState.cityName],
    }));

  updateStateCityWeatherAfterRemove = (removeId, removeCityName) => {
    const updateArrayCityWeather = this.state.cityWeather.filter(
      city => city.id !== removeId,
    );
    const updateArrayCityName = this.state.cityName.filter(
      city => city !== removeCityName,
    );
    this.setState({
      cityWeather: updateArrayCityWeather,
      cityName: updateArrayCityName,
    });
  };

  render() {
    const { cityWeather, error, status } = this.state;
    // console.log(this.state.cityName);
    console.log(this.state.cityWeather);
    return (
      <div>
        <FormFindCity onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <div>Введите название города</div>}
        {status === 'pending' && (
          <Puff
            color="#00BFFF"
            height={150}
            width={150}
            className={css.loader}
          />
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <ListCardCityWeather
            cityWeather={cityWeather}
            updateStateCityWeatherAfterRemove={
              this.updateStateCityWeatherAfterRemove
            }
          />
        )}
      </div>
    );
  }
}
