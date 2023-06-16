import axios from 'axios';
import { GeoCoordinates } from 'react-native-geolocation-service';
import {
  WeatherData,
  WeatherDataByCity,
  WeatherDetailData,
} from '../components/weather';
import { normalizeCities } from './Normalizers';

import { Unit } from '../store/types';

const appId = '439d4b804bc8187953eb36d2a8c26a02';

export const getWeather = async (
  coordinates: GeoCoordinates,
  unit = 'metric' as Unit,
): Promise<WeatherData | undefined> => {
  const { latitude, longitude } = coordinates;
  if (!latitude || !longitude) {
    return;
  }
  const response = await axios.get(
    `https://openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${appId}`,
  );
  return response?.data;
};

export const getWeatherInTheCity = async (
  city: string,
): Promise<WeatherDataByCity | undefined> => {
  if (!city.length) {
    return;
  }
  const response = await axios.get(
    `https://openweathermap.org/data/2.5/find?q=${city}&appid=${appId}`,
  );
  return response?.data;
};

export const getCities = async (): Promise<any> => {
  const response = await axios.get(
    'https://countriesnow.space/api/v0.1/countries',
  );
  return normalizeCities(response?.data.data);
};

export const getDetailWeather = async (
  coordinates: GeoCoordinates,
  unit = 'metric' as Unit,
): Promise<WeatherDetailData | undefined> => {
  const { latitude, longitude } = coordinates;
  if (!latitude || !longitude) {
    return;
  }
  const response = await axios.get(
    `https://openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${appId}`,
  );
  return response?.data;
};
