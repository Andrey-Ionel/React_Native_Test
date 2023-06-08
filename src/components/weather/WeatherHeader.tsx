import React, { memo, ReactNode } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import { getLocation } from '../../helpers/RadarManager';
import { getWeather } from '../../commerceDataSource';
import { HIT_SLOP_AREA, logError } from '../../helpers/common';
import moment from 'moment';

import { WeatherData } from './types';

import search from '../../assets/icons/search.png';
import location from '../../assets/icons/locationIcon.png';
import { styles } from './styles';

interface WeatherHeaderProps {
  weatherData?: WeatherData;
  setWeatherData: (
    value: ((prevState: WeatherData) => WeatherData) | WeatherData,
  ) => void;
}

export const WeatherHeader = memo(
  ({
    weatherData,
    setWeatherData,
    navigation,
  }: WeatherHeaderProps): ReactNode => {
    const date = Date.now();
    const formattedDate = moment(date)
      ?.format('LLLL')
      ?.split(',')
      ?.slice(0, 2)
      .join();

    const city = (!!weatherData?.name && weatherData.name) || '';
    const country =
      (!!weatherData?.sys?.country && weatherData?.sys?.country) || '';

    const title = (!!formattedDate && `${formattedDate}`) || '';
    const subtitle = (!!city && !!country && `${city}, ${country}`) || '';

    const getCurrentLocation = (): void => {
      getLocation(true)
        .then(coordinates => {
          getWeather(coordinates)
            .then(weather => {
              if (weather.name) {
                setWeatherData(weather);
              }
            })
            .catch(logError);
        })
        .catch(logError);
    };

    const goToSearch = () => {
      navigation?.navigate('Search');
    };

    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goToSearch}
          activeOpacity={0.7}
          hitSlop={HIT_SLOP_AREA}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <TouchableOpacity
          onPress={getCurrentLocation}
          activeOpacity={0.7}
          hitSlop={HIT_SLOP_AREA}>
          <Image source={location} style={styles.locationIcon} />
        </TouchableOpacity>
      </View>
    );
  },
);
