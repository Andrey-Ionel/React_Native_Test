import React, { FC, memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import { WeatherHeader } from './WeatherHeader';
import LinearGradient from 'react-native-linear-gradient';

import { getLocation } from '../../helpers/RadarManager';
import { getWeather } from '../../commerceDataSource';
import { logError } from '../../helpers/common';

import { WeatherData } from './types';

import colors from '../../varibles/colors';
import { styles } from './styles';

const initialWeatherData = {
  coord: {},
  weather: [],
  base: '',
  main: {},
  visibility: 0,
  wind: {},
  clouds: {},
  dt: 0,
  sys: {},
  timezone: 0,
  id: 0,
  name: '',
  cod: 0,
};

export const Weather: FC = memo(({ navigation }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(
    initialWeatherData as WeatherData,
  );

  useEffect(() => {
    getLocation()
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
  }, []);

  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        fixedComponentTop={
          <WeatherHeader
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            navigation={navigation}
          />
        }
        needInSafeArea={true}>
        <View />
      </ScreenWrapper>
    </LinearGradient>
  );
});
