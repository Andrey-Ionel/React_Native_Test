import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

import { getLocation } from '../../helpers/RadarManager';
import { getWeather } from '../../commerceDataSource/DataSource';

import { fonts } from '../../varibles/fonts';
import palette from '../../varibles/colors';
import { HIT_SLOP_AREA, logError } from '../../helpers/common';
import moment from 'moment';

import { WeatherData } from './types';

import search from '../../assets/icons/search.png';
import location from '../../assets/icons/locationIcon.png';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  locationIcon: {
    height: 30,
    width: 30,
  },
  searchIcon: {
    height: 25,
    width: 25,
  },
  title: {
    fontFamily: fonts.ghotamBold,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.ghotamBold,
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    color: palette.textPrimary,
    textAlign: 'center',
  },
});

interface WeatherHeaderProps {
  weatherData?: WeatherData;
  setWeatherData: (
    value:
      | ((prevState: WeatherData | undefined) => WeatherData | undefined)
      | WeatherData
      | undefined,
  ) => void;
}

export const WeatherHeader = ({
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
        getWeather(coordinates).then(weather => {
          if (weather.name) {
            setWeatherData(weather);
          }
        });
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
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={getCurrentLocation}
        activeOpacity={0.7}
        hitSlop={HIT_SLOP_AREA}>
        <Image source={location} style={styles.locationIcon} />
      </TouchableOpacity>
    </View>
  );
};
