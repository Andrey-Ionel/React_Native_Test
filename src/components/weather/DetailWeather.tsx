import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { getDetailWeather } from '../../commerceDataSource';
import { logError, weatherIconURL } from '../../helpers/common';

import { GeoCoordinates } from 'react-native-geolocation-service';
import { WeatherData, WeatherDetailDaily, WeatherDetailData } from './types';
import MultiCarousel from '../MultiCarousel';
import { styles } from './styles';
import moment from 'moment/moment';

interface DetailWeatherProps {
  weather: WeatherData;
}

export const DetailWeather: FC = memo(
  ({ weather }: DetailWeatherProps): ReactNode => {
    const [weatherDetail, setWeatherDetail] = useState<WeatherDetailData>();
    const daily = weatherDetail?.daily?.slice(1);

    useEffect(() => {
      if (!!weather?.coord?.lon && !!weather?.coord?.lat) {
        getDetailWeather({
          longitude: weather?.coord?.lon,
          latitude: weather?.coord?.lat,
        } as GeoCoordinates)
          .then(detailWeather => {
            setWeatherDetail(detailWeather);
          })
          .catch(logError);
      }
    }, [weather?.coord?.lat, weather?.coord?.lon]);

    const keyExtractor = (item: WeatherDetailDaily, index: number) =>
      `${item?.dt || index}`;

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
          <Image style={styles.detailDailyIcon} source={{ uri: iconUrl }} />
          <Text style={styles.detailDailyText}>{formattedDate}</Text>
          <Text
            style={[
              styles.detailDailyText,
              styles.detailDailyMaxText,
            ]}>{`${minTemp}°`}</Text>
          <Text style={styles.detailDailyText}>{`${maxTemp}°`}</Text>
        </View>
      );
    };

    return (
      <MultiCarousel
        itemsPerPage={4}
        style={styles.wrapper}
        items={daily || []}
        dotStyle={styles.dotStyle}
        renderItem={renderDailyItem}
        keyExtractor={keyExtractor}
      />
    );
  },
);
