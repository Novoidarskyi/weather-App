import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  fetchOneCityWeather,
  fetchUpdateWeatherOneCity,
  fetchCityWeatherFromLocalStorage,
} from './cityWeather-operations';
import { remove } from './cityWeather-actions';

const entities = createReducer([], {
  [fetchOneCityWeather.fulfilled]: (state, { payload }) => [payload, ...state],
  [fetchUpdateWeatherOneCity.fulfilled]: (state, { payload }) =>
    state.reduce((acc, city) => {
      city.id !== payload.id ? acc.push(city) : acc.push(payload);
      return acc;
    }, []),
  [fetchCityWeatherFromLocalStorage.fulfilled]: (_, { payload }) => payload,
  [remove]: (state, { payload }) => state.filter(city => city.id !== payload),
});

const isLoading = createReducer(false, {
  [fetchOneCityWeather.pending]: () => true,
  [fetchOneCityWeather.fulfilled]: () => false,
  [fetchOneCityWeather.rejected]: () => false,
  [fetchCityWeatherFromLocalStorage.pending]: () => true,
  [fetchCityWeatherFromLocalStorage.fulfilled]: () => false,
  [fetchCityWeatherFromLocalStorage.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchOneCityWeather.rejected]: (_, { payload }) => payload,
  [fetchUpdateWeatherOneCity.rejected]: (_, { payload }) => payload,
  [fetchCityWeatherFromLocalStorage.rejected]: (_, { payload }) => payload,
});

export default combineReducers({
  entities,
  isLoading,
  error,
});
