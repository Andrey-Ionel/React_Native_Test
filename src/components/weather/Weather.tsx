import React, { FC, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { getLocation } from '../../helpers/RadarManager';
import { getWeather } from '../../commerceDataSource/DataSource';
import { ScreenWrapper } from '../ScreenWrapper';
import { WeatherHeader } from './WeatherHeader';
import { logError } from '../../helpers/common';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherData } from './types';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
  },
});

export const Weather: FC = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  useEffect(() => {
    getLocation()
      .then(coordinates => {
        getWeather(coordinates).then(weather => {
          if (weather.name) {
            setWeatherData(weather);
          }
        });
      })
      .catch(logError);
  }, []);

  return (
    <LinearGradient colors={['#3F8D73', '#1A434C', '#102F40', '#061A2F']}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        fixedComponentTop={
          weatherData && (
            <WeatherHeader
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              navigation={navigation}
            />
          )
        }
        needInSafeArea={true}>
        <View />
      </ScreenWrapper>
    </LinearGradient>
  );
};
