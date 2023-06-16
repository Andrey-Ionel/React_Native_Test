import React, { FC, memo } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { HIT_SLOP_AREA } from '../../helpers/common';
import { styles } from './styles';

import searchIcon from '../../assets/icons/searchBlack.png';
import backArrow from '../../assets/icons/backArrow.png';

interface SearchBarProps {
  city: string;
  onCityChange: (value: string) => void;
  getCityWeather: (citiItem?: string) => () => void;
  navigation: NavigationProp<ParamListBase>;
}

export const SearchBar: FC<SearchBarProps> = memo(
  ({ city, onCityChange, getCityWeather, navigation }) => {
    const goBack = () => {
      navigation?.goBack();
    };

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image style={styles.backArrow} source={backArrow} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={'Enter city'}
          value={city}
          onChangeText={onCityChange}
          onSubmitEditing={getCityWeather(city)}
        />
        <TouchableOpacity
          hitSlop={HIT_SLOP_AREA}
          onPress={getCityWeather(city)}>
          <Image style={styles.searchIcon} source={searchIcon} />
        </TouchableOpacity>
      </View>
    );
  },
);
