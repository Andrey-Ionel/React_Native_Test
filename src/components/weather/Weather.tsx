import React, { FC, memo, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import { WeatherHeader } from './WeatherHeader';
import LinearGradient from 'react-native-linear-gradient';
import { DetailWeather } from './DetailWeather';
import { WeatherBanner } from './WeatherBanner';

import { getLocation } from '../../helpers/RadarManager';
import { logError } from '../../helpers/common';

import { WeatherData } from './types';
import { GeoCoordinates } from 'react-native-geolocation-service';

import colors from '../../varibles/colors';
import { styles } from './styles';

interface WeatherProps {
  weather: WeatherData;
  getWeatherRequest: (
    coordinates: GeoCoordinates,
  ) => (dispatch: any) => Promise<void>;
}

export const Weather: FC = memo(
  ({ navigation, weather, getWeatherRequest }: WeatherProps) => {
    const [showHourly, setShowHourly] = useState<boolean>(false);
    useEffect(() => {
      getLocation()
        .then(coordinates => {
          getWeatherRequest(coordinates);
        })
        .catch(logError);
    }, [getWeatherRequest]);

    const toggleDailyHourly = () => {
      setShowHourly(!showHourly);
    };

    return (
      <LinearGradient colors={colors.systemBackgroundGradient}>
        <ScreenWrapper
          screenStyle={styles.screenContainer}
          fixedComponentTop={
            <WeatherHeader
              weatherData={weather}
              navigation={navigation}
              getWeatherRequest={getWeatherRequest}
            />
          }
          needInSafeArea={true}>
          <TouchableOpacity style={styles.wrapper} onPress={toggleDailyHourly}>
            {!showHourly && <WeatherBanner weather={weather} />}
          </TouchableOpacity>
          {!showHourly && <DetailWeather weather={weather} />}
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
