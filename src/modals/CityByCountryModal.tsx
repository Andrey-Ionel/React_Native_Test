import React, { FC } from 'react';
import {
  Alert,
  FlatList,
  FlatListProps,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../components/searchLocation';
import { WeatherData } from '../components/weather';
import { fonts } from '../varibles/fonts';

const modalStyles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 350,
  },
  item: {
    fontFamily: fonts.gotham,
    fontSize: 22,
    letterSpacing: 0.3,
    paddingVertical: 5,
  },
  title: {
    fontFamily: fonts.gotham,
    fontSize: 16,
    letterSpacing: 0.3,
    paddingVertical: 5,
  },
});

interface CityByCountryModalProps {
  citiesWeather: WeatherData[];
  onWeatherByCityPress: (item: WeatherData) => void;
  modalVisible: boolean;
  toggleModal: () => void;
}

const yourCountryText = 'Choose a city for your country';
const yourCityText = 'Your city';

export const CityByCountryModal: FC<CityByCountryModalProps> = ({
  citiesWeather,
  onWeatherByCityPress,
  modalVisible,
  toggleModal,
}: CityByCountryModalProps) => {
  if (!citiesWeather?.length) {
    return null;
  }

  const keyExtractor: FlatListProps<WeatherData>['keyExtractor'] = (item, i) =>
    item.id + i.toString();

  const onCityPress = (item: WeatherData) => () => {
    onWeatherByCityPress(item);
    toggleModal?.();
  };

  const renderCityWithCountry = (item: WeatherData) => {
    const cityWithCountry =
      (!!item?.name &&
        !!item.sys.country &&
        `${item.name}, ${item.sys.country}`) ||
      '';
    return (
      <TouchableOpacity onPress={onCityPress(item)}>
        <Text style={modalStyles.item}>{cityWithCountry}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        toggleModal?.();
      }}>
      <View style={modalStyles.modalWrapper}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.title}>
            {citiesWeather?.length > 1 ? yourCountryText : yourCityText}
          </Text>
          <FlatList
            keyExtractor={keyExtractor}
            style={citiesWeather?.length ? styles.listData : styles.emptyList}
            data={citiesWeather}
            renderItem={({ item }) => renderCityWithCountry(item)}
          />
        </View>
      </View>
    </Modal>
  );
};
