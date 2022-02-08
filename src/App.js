import { useState, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';
import FormFindCity from 'components/FormFindCity';
import ListCardCityWeather from './components/ListCardCityWeather';
import { fetchCity, fetchByLocalStorage } from './api/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const [cityName, setCityName] = useLocalStorage('cities', []);
  const [cityWeather, setCityWeather] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(() =>
    cityName.length !== 0 ? STATUS.PENDING : STATUS.IDLE,
  );

  useEffect(() => {
    const cityFromLocalStorage = JSON.parse(
      window.localStorage.getItem('cities'),
    );
    if (cityFromLocalStorage.length !== 0) {
      setStatus(STATUS.PENDING);
      fetchByLocalStorage(cityFromLocalStorage).then(data => {
        setCityWeather(data);
        setStatus(STATUS.RESOLVED);
      });
    }
  }, []);

  useEffect(() => {
    if (cityName.length === 0 && cityWeather.length === 0)
      setStatus(STATUS.IDLE);
  }, [cityName.length, cityWeather.length]);

  const handleFormSubmit = newCityName => {
    if (cityName.includes(newCityName)) {
      return alert(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }

    setStatus(STATUS.PENDING);
    fetchCity(newCityName)
      .then(data => {
        setCityWeather([data, ...cityWeather]);
        setCityName([data.name, ...cityName]);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(STATUS.REJECTED);
      });
  };

  const updateStateCityWeatherAfterRemove = (removeId, removeCityName) => {
    setCityName(cityName.filter(city => city !== removeCityName));
    setCityWeather(cityWeather.filter(city => city.id !== removeId));
  };

  const updateStateCityWeatherToOneCity = name => {
    fetchCity(name)
      .then(data =>
        setCityWeather(
          cityWeather.reduce((acc, city) => {
            city.id !== data.id ? acc.push(city) : acc.push(data);
            return acc;
          }, []),
        ),
      )
      .catch(error => {
        setError(error);
        setStatus(STATUS.REJECTED);
      });
  };

  console.log(cityName);
  console.log(cityWeather);
  console.log(status);
  return (
    <div>
      <FormFindCity onSubmit={handleFormSubmit} />
      {status === 'idle' && <div>Введите название города</div>}
      {status === 'pending' && (
        <Puff color="#00BFFF" height={150} width={150} className={css.loader} />
      )}
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'resolved' && (
        <ListCardCityWeather
          cityWeather={cityWeather}
          updateStateCityWeatherAfterRemove={updateStateCityWeatherAfterRemove}
          updateStateCityWeatherToOneCity={updateStateCityWeatherToOneCity}
        />
      )}
    </div>
  );
}

export default App;
