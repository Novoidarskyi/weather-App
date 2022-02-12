import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Puff } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOneCityWeather,
  fetchCityWeatherFromLocalStorage,
} from '../redux/cityWeather/cityWeather-operations';
import {
  citiesWeatherArray,
  isLoading,
} from '../redux/cityWeather/cityWeather-selectors';
import useLocalStorage from 'hooks/useLocalStorage';
import FormFindCity from 'components/FormFindCity';
import ListCardCityWeather from 'components/ListCardCityWeather';

function HomeView() {
  const [cityName, setCityName] = useLocalStorage('cities', []);
  const cityWeather = useSelector(citiesWeatherArray);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const cityFromLocalStorage = JSON.parse(
      window.localStorage.getItem('cities'),
    );
    if (cityFromLocalStorage.length !== 0) {
      dispatch(fetchCityWeatherFromLocalStorage(cityFromLocalStorage));
    }
  }, [dispatch]);

  const handleFormSubmit = newCityName => {
    if (cityName.includes(newCityName)) {
      return toast.warning(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }
    dispatch(fetchOneCityWeather(newCityName));
  };

  useEffect(() => {
    if (cityWeather.length !== 0) {
      setCityName(cityWeather.map(city => city.name));
    }
  }, [cityWeather, setCityName]);

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <FormFindCity onSubmit={handleFormSubmit} />
      <ListCardCityWeather />
      {cityWeather.length === 0 && <div>Введите название города</div>}
      {loading && (
        <Puff color="#00BFFF" height={150} width={150} className={css.loader} />
      )}
    </div>
  );
}

export default HomeView;