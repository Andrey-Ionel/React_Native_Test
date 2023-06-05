import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { ScreenWrapper } from './ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: screenHeight,
  },
});

export const SearchLocation: FC = () => {
  return (
    <LinearGradient colors={['#3F8D73', '#1A434C', '#102F40', '#061A2F']}>
      <ScreenWrapper screenStyle={styles.screenContainer} needInSafeArea={true}>
        <View>
          <Text>{'yourWeatherText'}</Text>
        </View>
      </ScreenWrapper>
    </LinearGradient>
  );
};
