import { getWeather } from '../../commerceDataSource';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { Dispatch } from 'react';
import { Unit } from '../types';

export const SET_WEATHER = 'SET_WEATHER';
export const SET_ERROR = 'SET_ERROR';
export const SET_UNIT = 'SET_UNIT';

export const getWeatherRequest = (coordinates: GeoCoordinates, unit?: Unit) => {
  return async (dispatch: Dispatch<any>) => {
    await getWeather(coordinates, unit)
      .then(response => {
        dispatch({ type: SET_WEATHER, payload: response });
      })
      .catch(e => {
        dispatch({ type: SET_ERROR, payload: e.message });
      });
  };
};

export const setUnits = (unit: Unit, coordinates: GeoCoordinates) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: SET_UNIT, payload: unit });
    await getWeather(coordinates, unit)
      .then(response => {
        dispatch({ type: SET_WEATHER, payload: response });
      })
      .catch(e => {
        dispatch({ type: SET_ERROR, payload: e.message });
      });
  };
};
