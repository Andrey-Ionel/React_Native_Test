import axios from 'axios';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { WeatherData } from '../components/weather';

export const getWeather = async (
  coordinates: GeoCoordinates,
): Promise<WeatherData> => {
  const { latitude, longitude } = coordinates;
  if (!latitude || !longitude) {
    return;
  }
  const appId = '439d4b804bc8187953eb36d2a8c26a02';
  const response = await axios.get(
    `https://openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}`,
  );
  return response?.data;
};
