import React, { FC, memo, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import { WeatherHeader } from './WeatherHeader';
import LinearGradient from 'react-native-linear-gradient';
import { DetailWeather } from './DetailWeather';
import { WeatherBanner } from './WeatherBanner';
import { Loading } from '../Loading';

import { getLocation } from '../../helpers/RadarManager';

import { WeatherData } from './types';
import { GeoCoordinates } from 'react-native-geolocation-service';

import colors from '../../varibles/colors';
import { styles } from './styles';
import { TodayWeatherDetail } from './TodayWeatherDetail';
import { logError } from '../../helpers/common';

interface WeatherProps {
  weather: WeatherData;
  getWeatherRequest: (
    coordinates: GeoCoordinates,
    unit?: Unit,
  ) => (dispatch: any) => Promise<void>;
  setUnits: (unit: Unit, coordinates: GeoCoordinates) => void;
  error: string;
}

export const Weather: FC = memo(
  ({
    navigation,
    weather,
    error,
    unit,
    setUnits,
    getWeatherRequest,
  }: WeatherProps) => {
    const [showHourly, setShowHourly] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      getLocation()
        .then(coordinates => {
          getWeatherRequest(coordinates);
        })
        .catch(e => {
          setLoading(false);
          logError(e);
        });
      if (weather?.sys?.country?.length) {
        setLoading(false);
      }
    }, [getWeatherRequest, weather?.sys?.country?.length]);

    const toggleDailyHourly = () => {
      setShowHourly(!showHourly);
    };

    if (error.length) {
      Alert.alert(
        'Something went wrong while trying to get weather.',
        `"${error}"`,
      );
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <LinearGradient colors={colors.systemBackgroundGradient}>
        <ScreenWrapper
          screenStyle={styles.screenContainer}
          scroll={true}
          fixedComponentTop={
            <WeatherHeader
              weatherData={weather}
              navigation={navigation}
              getWeatherRequest={getWeatherRequest}
              unit={unit}
            />
          }
          fixedComponentBottom={
            <DetailWeather
              weather={weather}
              showHourly={showHourly}
              unit={unit}
              setUnits={setUnits}
            />
          }
          needInSafeArea={true}>
          <TouchableOpacity style={styles.wrapper} onPress={toggleDailyHourly}>
            {showHourly ? (
              <TodayWeatherDetail weather={weather} unit={unit} />
            ) : (
              <WeatherBanner weather={weather} />
            )}
          </TouchableOpacity>
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
