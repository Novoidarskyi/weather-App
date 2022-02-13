import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCity, fetchByLocalStorage } from 'api/api';

// Запрос о состоянии погоды в городе по названию

export const fetchOneCityWeather = createAsyncThunk(
  'cityWeather/fetchCityWeather',
  async (data, { rejectWithValue }) => {
    try {
      const citiesWeather = await fetchCity(data);
      return citiesWeather;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Обновление состояния погоды одного города

export const fetchUpdateWeatherOneCity = createAsyncThunk(
  'cityWeather/updateWeatherOneCity',
  async name => {
    const cityWeather = await fetchCity(name);
    return cityWeather;
  },
);

// Запрос о состоянии погоды в город(е/ах) сохраненных в localStorage

export const fetchCityWeatherFromLocalStorage = createAsyncThunk(
  'cityWeather/fetchByLocalStorage',
  async data => {
    const citiesWeather = await fetchByLocalStorage(data);
    return citiesWeather;
  },
);
