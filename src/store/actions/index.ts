import { getWeather } from '../../commerceDataSource';
import { GeoCoordinates } from 'react-native-geolocation-service';

export const SET_WEATHER = 'SET_WEATHER';

export const getWeatherRequest = (coordinates: GeoCoordinates) => {
  return async dispatch => {
    await getWeather(coordinates).then(response => {
      dispatch({ type: SET_WEATHER, payload: response });
    });
  };
};
