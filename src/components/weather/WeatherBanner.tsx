import { Image, Text, View } from 'react-native';
import React from 'react';

import { weatherIconURL } from '../../helpers/common';

import { WeatherData } from './types';

import { styles } from './styles';

interface DetailBannerProps {
  weather: WeatherData;
}
export const WeatherBanner = ({ weather }: DetailBannerProps) => {
  const iconId = weather?.weather?.[0]?.icon || '';
  const weatherDescription =
    weather?.weather?.[0]?.description?.[0].toUpperCase() +
      weather?.weather?.[0]?.description?.slice(1) || '';
  const temperature = Math.round(weather?.main?.temp || 0);
  const temperatureText = `${temperature}°`;
  const iconUrl = `${weatherIconURL}${iconId}@4x.png`;
  return (
    <View style={styles.iconWrapper}>
      <Image
        style={styles.mainIcon}
        source={{
          uri: iconUrl,
        }}
      />
      <Text style={styles.title}>{weatherDescription}</Text>
      <Text style={styles.temperatureText}>{temperatureText}</Text>
    </View>
  );
};
