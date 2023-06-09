import React, { FC, memo, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
import { CityByCountryModal } from '../../modals/CityByCountryModal';

import { WeatherData } from '../weather';
import { GeoCoordinates } from 'react-native-geolocation-service';

import { styles } from './styles';
import colors from '../../varibles/colors';

interface SearchLocationProps {
  weather: WeatherData;
  getWeatherRequest: (
    coordinates: GeoCoordinates,
  ) => (dispatch: any) => Promise<void>;
}

export const SearchLocation: FC = memo(
  ({ navigation, getWeatherRequest }: SearchLocationProps) => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState<string[]>([]);
    const [showCityHint, setShowCityHint] = useState(true);
    const [citiesWeather, setCitiesWeather] = useState<WeatherData[]>();
    const [modalVisible, setModalVisible] = useState(false);
    const [showNoWeather, setShowNoWeather] = useState(false);

    const dataList =
      (!!city?.length &&
        !!cities?.length &&
        cities
          ?.filter(
            town => town?.toLowerCase()?.indexOf(city?.toLowerCase()) === 0,
          )
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
              await setStorageValue(AsyncStorageKeys.citiesData, data).catch(
                e => logError(e),
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
        if (citiesData?.list?.length > 1) {
          toggleModal();
          setCitiesWeather(citiesData?.list);
        }
        if (citiesData?.list?.length === 1) {
          handleWeatherByCityPress(citiesData.list?.[0]);
        }
        setShowNoWeather(true);
      });
    };

    const handleCityChange = (value: string) => {
      const validCity = (value + '')?.replace(ONLY_WORDS, '');
      setCity(validCity);
      setShowCityHint(true);
      setShowNoWeather(false);
    };

    const onCitiesItemPress = (item: string) => () => {
      setCity(item);
      setShowCityHint(false);
    };

    const handleWeatherByCityPress = (item?: WeatherData) => {
      getWeatherRequest({
        longitude: item?.coord?.lon,
        latitude: item?.coord?.lat,
      } as GeoCoordinates);
      navigation.goBack();
    };

    const toggleModal = () => {
      setModalVisible(!modalVisible);
      setShowNoWeather(false);
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

    const renderNoWeather = () => {
      const noResultText = `No Weather for "${city}"`;
      return (
        <View>
          <Text style={styles.noResult}>{noResultText}</Text>
        </View>
      );
    };

    const keyExtractor: FlatListProps<string[]>['keyExtractor'] = (item, i) =>
      item + i.toString();

    const renderSeparator = () => {
      return <View style={styles.separator} />;
    };

    return (
      <LinearGradient colors={colors.searchBackgroundGradient}>
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
          {!!modalVisible && (
            <CityByCountryModal
              citiesWeather={citiesWeather}
              onWeatherByCityPress={handleWeatherByCityPress}
              modalVisible={modalVisible}
              toggleModal={toggleModal}
            />
          )}
          {showNoWeather && !modalVisible && !showCityHint && renderNoWeather()}
          {showCityHint && (
            <FlatList
              keyExtractor={keyExtractor}
              style={city ? styles.listData : styles.emptyList}
              data={dataList}
              renderItem={({ item }) => renderCityItem(item)}
              ItemSeparatorComponent={renderSeparator}
            />
          )}
        </ScreenWrapper>
      </LinearGradient>
    );
  },
);
