import React, { FC, memo } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { getLocation } from '../../helpers/RadarManager';
import { HIT_SLOP_AREA, logError } from '../../helpers/common';
import moment from 'moment';

import { WeatherData } from './types';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { Unit } from '../../store/types';

import { styles } from './styles';

import search from '../../assets/icons/search.png';
import location from '../../assets/icons/locationIcon.png';

interface WeatherHeaderProps {
  weatherData?: WeatherData;
  getWeatherRequest: (
    coordinates: GeoCoordinates,
    unit: Unit,
  ) => (dispatch: any) => Promise<void>;
  unit: Unit;
  navigation: NavigationProp<ParamListBase>;
}

export const WeatherHeader: FC<WeatherHeaderProps> = memo(
  ({ weatherData, navigation, getWeatherRequest, unit }) => {
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
          if (coordinates) {
            getWeatherRequest(coordinates, unit);
          }
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
