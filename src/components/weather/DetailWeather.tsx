import React, { FC, memo, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { getDetailWeather } from '../../commerceDataSource';
import { logError, weatherIconURL } from '../../helpers/common';

import { GeoCoordinates } from 'react-native-geolocation-service';
import {
  WeatherData,
  WeatherDetailCurrent,
  WeatherDetailDaily,
  WeatherDetailData,
} from './types';
import MultiCarousel from '../MultiCarousel';
import moment from 'moment/moment';

import { Unit } from '../../store/types';

import { styles } from './styles';
interface DetailWeatherProps {
  weather: WeatherData;
  showHourly: boolean;
  unit: Unit;
  setUnits: (unit: Unit, coordinates: GeoCoordinates) => void;
}

export const DetailWeather: FC<DetailWeatherProps> = memo(
  ({ weather, showHourly, unit, setUnits }) => {
    const [weatherDetail, setWeatherDetail] = useState<WeatherDetailData>();
    const daily = weatherDetail?.daily?.slice(1);
    const hourly = weatherDetail?.hourly?.filter(
      (_, index) => !((index + 1) % 2),
    );

    useEffect(() => {
      if (!!weather?.coord?.lon && !!weather?.coord?.lat) {
        getDetailWeather(
          {
            longitude: weather?.coord?.lon,
            latitude: weather?.coord?.lat,
          } as GeoCoordinates,
          unit,
        )
          .then(detailWeather => {
            setWeatherDetail(detailWeather);
          })
          .catch(logError);
      }
    }, [unit, weather?.coord?.lat, weather?.coord?.lon]);

    const keyExtractor = (item: WeatherDetailDaily, index: number) =>
      `${item?.dt || index}`;

    const setCorrectUnit = () => {
      const correctUnit = unit === 'metric' ? 'imperial' : 'metric';
      setUnits(correctUnit, {
        longitude: weather?.coord?.lon,
        latitude: weather?.coord?.lat,
      } as GeoCoordinates);
    };

    const renderDailyItem = (item: WeatherDetailDaily) => {
      const iconId = item?.weather?.[0]?.icon || '';
      const iconUrl = `${weatherIconURL}${iconId}@2x.png`;
      const date = new Date(+item.dt * 1000 || 0);
      const formattedDate = moment(date)
        ?.format('llll')
        ?.split(',')
        ?.slice(0, 1)
        .join();
      const maxTemp = Math.round(item?.temp?.max || 0);
      const minTemp = Math.round(item?.temp?.min || 0);

      return (
        <View style={styles.detailDailyContainer}>
          <Image style={styles.detailIcon} source={{ uri: iconUrl }} />
          <Text style={styles.detailText}>{formattedDate}</Text>
          <Text style={[styles.detailText, styles.detailDarkText]}>
            {`${minTemp}°`}
          </Text>
          <Text style={styles.detailText}>{`${maxTemp}°`}</Text>
        </View>
      );
    };

    const renderHourlyItem = (item: WeatherDetailCurrent) => {
      const iconId = item?.weather?.[0]?.icon || '';
      const iconUrl = `${weatherIconURL}${iconId}@2x.png`;
      const date = new Date(+item.dt * 1000 || 0)
        .toLocaleString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
        })
        .split(' ');
      const hourlyDate =
        date.length > 2 ? date.slice(3, 4).join(' ') : date.join(' ');
      const temp = Math.round(item?.temp || 0);
      const rainPercent = `${(item?.pop * 100).toFixed() || 0}%`;

      return (
        <View style={styles.detailDailyContainer}>
          <Image style={styles.detailIcon} source={{ uri: iconUrl }} />
          <Text style={styles.detailTimeText}>{hourlyDate}</Text>
          <Text style={[styles.detailText, styles.detailDarkText]}>
            {rainPercent}
          </Text>
          <Text style={styles.detailText}>{`${temp}°`}</Text>
        </View>
      );
    };

    const renderUnitsSwitcher = () => {
      const switcherTitle = unit === 'metric' ? 'C' : 'F';
      return (
        <TouchableOpacity
          style={styles.switcherContainer}
          onPress={setCorrectUnit}>
          <Text style={styles.switcherText}>{switcherTitle}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <MultiCarousel
          itemsPerPage={4}
          items={(showHourly ? hourly : daily) || []}
          dotStyle={styles.dotStyle}
          renderItem={showHourly ? renderHourlyItem : renderDailyItem}
          keyExtractor={keyExtractor}
        />
        {renderUnitsSwitcher()}
      </>
    );
  },
);
