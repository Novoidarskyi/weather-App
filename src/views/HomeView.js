import { useState, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCity, fetchByLocalStorage } from '../api/api';
import FormFindCity from 'components/FormFindCity';
import ListCardCityWeather from '../components/ListCardCityWeather';
import css from 'components/Loader/Loader.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
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

function HomeView() {
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
      fetchByLocalStorage(cityFromLocalStorage)
        .then(setCityWeather)
        .catch(error => {
          setError(error);
          toast.error(error.message);
        })
        .finally(setStatus(STATUS.RESOLVED));
    }
  }, []);

  useEffect(() => {
    if (cityName.length === 0) setStatus(STATUS.IDLE);
  }, [cityName.length]);

  const handleFormSubmit = newCityName => {
    if (cityName.includes(newCityName)) {
      return toast.warning(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }

    setStatus(STATUS.PENDING);
    fetchCity(newCityName)
      .then(data => {
        setCityWeather([data, ...cityWeather]);
        setCityName([data.name, ...cityName]);
      })
      .catch(error => {
        setError(error);
        toast.error(error.message);
      })
      .finally(setStatus(STATUS.RESOLVED));
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
        toast.error(error.message);
      })
      .finally(setStatus(STATUS.RESOLVED));
  };

  // console.log(cityName);
  // console.log(cityWeather);
  // console.log(status);
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <FormFindCity onSubmit={handleFormSubmit} />
      {status === 'idle' && <div>Введите название города</div>}
      {status === 'pending' && (
        <Puff color="#00BFFF" height={150} width={150} className={css.loader} />
      )}
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

export default HomeView;
