import { configureStore } from '@reduxjs/toolkit';
import citiesWeatherReducer from './cityWeather/cityWeather-reducer';

const store = configureStore({
  reducer: {
    citiesWeather: citiesWeatherReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
