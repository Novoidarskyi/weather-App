import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCity, fetchByLocalStorage } from 'api/api';

export const fetchOneCityWeather = createAsyncThunk(
  'cityWeather/fetchCityWeather',
  async data => {
    const citiesWeather = await fetchCity(data);
    return citiesWeather;
  },
);

export const fetchUpdateWeatherOneCity = createAsyncThunk(
  'cityWeather/updateWeatherOneCity',
  async name => {
    const cityWeather = await fetchCity(name);
    return cityWeather;
  },
);

export const fetchCityWeatherFromLocalStorage = createAsyncThunk(
  'cityWeather/fetchByLocalStorage',
  async data => {
    const citiesWeather = await fetchByLocalStorage(data);
    return citiesWeather;
  },
);
