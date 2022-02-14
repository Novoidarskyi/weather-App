import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircleLoader from 'react-spinners/CircleLoader';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOneCityWeather,
  fetchCityWeatherFromLocalStorage,
} from 'redux/cityWeather/cityWeather-operations';
import {
  citiesWeatherArray,
  isLoading,
} from 'redux/cityWeather/cityWeather-selectors';
import useLocalStorage from 'hooks/useLocalStorage';
import FormFindCity from 'components/FormFindCity';
import ListCardCityWeather from 'components/ListCardCityWeather';
import s from '../css/common.module.css';

function HomeView() {
  const [cityName, setCityName] = useLocalStorage('cities', []);
  const cityWeather = useSelector(citiesWeatherArray);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  //Обновление state по списку городов из LocalStorage
  useEffect(() => {
    const cityFromLocalStorage = JSON.parse(
      window.localStorage.getItem('cities'),
    );
    if (cityFromLocalStorage.length !== 0) {
      dispatch(fetchCityWeatherFromLocalStorage(cityFromLocalStorage));
    }
  }, [dispatch]);

  //Обновление state городов при добавлениии нового города
  useEffect(() => {
    setCityName(cityWeather.map(city => city.name));
  }, [cityWeather, setCityName]);

  // Запрос о состоянии погоды в городе при Submit формы

  const handleFormSubmit = newCityName => {
    if (cityName.includes(newCityName)) {
      return toast.warning(
        'Информация о погоде данного города уже предоставлена на странице',
      );
    }
    dispatch(fetchOneCityWeather(newCityName));
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      <FormFindCity onSubmit={handleFormSubmit} />
      {loading && (
        <CircleLoader
          color="white"
          size={150}
          css={`
            position: fixed;
            top: 50%;
            left: 50%;
          `}
        />
      )}
      <div className={s.container}>
        <ListCardCityWeather />
      </div>
    </>
  );
}

export default HomeView;
