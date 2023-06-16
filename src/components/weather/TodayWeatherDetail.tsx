import { Text, View } from 'react-native';
import React from 'react';

import { WeatherData } from './types';
import { Unit } from '../../store/types';

import { styles } from './styles';

interface TodayWeatherDetailProps {
  weather: WeatherData;
  unit: Unit;
}

const weatherDescription = [
  { title: 'Wind', key: 'speed' },
  { title: 'Humidity', key: 'humidity' },
  { title: 'Atm pressure', key: 'pressure' },
  { title: 'Sunrise', key: 'sunrise' },
  { title: 'Sunset', key: 'sunset' },
];

export const TodayWeatherDetail = ({
  weather,
  unit,
}: TodayWeatherDetailProps) => {
  const getDescriptionValue = (key: string) => {
    const windMeasurement = unit === 'metric' ? ' m/s' : ' mph';
    switch (key) {
      case 'speed': {
        return weather.wind[key] + windMeasurement;
      }
      case 'humidity': {
        return weather.main[key] + '%';
      }
      case 'pressure': {
        return weather.main[key] + ' hPa';
      }
      case 'sunrise': {
        return new Date(+weather.sys[key] * 1000 || 0).toLocaleString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        });
      }
      case 'sunset': {
        return new Date(+weather.sys[key] * 1000 || 0).toLocaleString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        });
      }
      default:
        return '';
    }
  };
  return (
    <>
      {weatherDescription.map(section => {
        const value = getDescriptionValue(section.key);
        return (
          <View style={styles.todayDetail} key={section.title}>
            <Text style={styles.title}>{section.title}</Text>
            <Text style={styles.title}>{value}</Text>
          </View>
        );
      })}
    </>
  );
};
