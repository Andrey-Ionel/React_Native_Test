import React, { FC, memo, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { ScreenWrapper } from '../ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { SearchBar } from './SearchBar';

import { getCities, getWeatherInTheCity } from '../../commerceDataSource';
import { logError, ONLY_WORDS } from '../../helpers/common';
import {
  AsyncStorageKeys,
  getStorageValue,
  setStorageValue,
} from '../../helpers/asyncStorage';
import { styles } from './styles';

export const SearchLocation: FC = memo(({ navigation }) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [showCityHint, setShowCityHint] = useState(true);
  const dataList =
    (!!city?.length &&
      !!cities?.length &&
      cities
        ?.filter(town => town?.toLowerCase().indexOf(city.toLowerCase()) === 0)
        .slice(0, 20)) ||
    [];

  const saveCities = async () => {
    await getStorageValue(AsyncStorageKeys.citiesData).then(
      async storageData => {
        if (storageData?.length) {
          setCities(JSON.parse(storageData));
        } else {
          getCities().then(async data => {
            setCities(data);
            await setStorageValue(AsyncStorageKeys.citiesData, data).catch(e =>
              logError(e),
            );
          });
        }
      },
    );
  };

  useEffect(() => {
    saveCities().catch(e => logError(e));
  }, []);

  const getCityWeather = (): void => {
    setShowCityHint(false);
    getWeatherInTheCity(city).then(citiesData => {
      console.log(31, 'zxc', 'citiesData', citiesData);
    });
  };

  const handleCityChange = (value: string) => {
    const validCity = (value + '').replace(ONLY_WORDS, '');
    setCity(validCity);
    setShowCityHint(true);
  };

  const onCitiesItemPress = (item: string) => () => {
    setCity(item);
    setShowCityHint(false);
  };

  const renderCityItem = (item: string) => {
    return (
      <TouchableOpacity onPress={onCitiesItemPress(item)}>
        <Text style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderNoSearchResult = () => {
    const noResultText = `No Results for "${city}"`;
    return (
      <View>
        <Text style={styles.noResult}>{noResultText}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#fff', '#EBEBEB', '#CDCDCD', '#828C91']}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        needInSafeArea={true}
        fixedComponentTop={
          <SearchBar
            city={city}
            onCityChange={handleCityChange}
            getCityWeather={getCityWeather}
            navigation={navigation}
          />
        }>
        {!dataList?.length && !!city?.length && renderNoSearchResult()}
        {showCityHint && (
          <FlatList
            style={city ? styles.listData : styles.emptyList}
            data={dataList}
            renderItem={({ item }) => renderCityItem(item)}
          />
        )}
      </ScreenWrapper>
    </LinearGradient>
  );
});
