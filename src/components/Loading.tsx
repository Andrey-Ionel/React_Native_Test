import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScreenWrapper } from './ScreenWrapper';

import colors from '../varibles/colors';
import { styles } from './weather';

export const Loading: FC = () => {
  return (
    <LinearGradient colors={colors.systemBackgroundGradient}>
      <ScreenWrapper
        screenStyle={styles.screenContainer}
        needInSafeArea={false}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      </ScreenWrapper>
    </LinearGradient>
  );
};
