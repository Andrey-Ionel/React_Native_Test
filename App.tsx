import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import { getPosition } from './src/RadarManager';

const App: () => React.ReactNode = () => {
  useEffect(() => {
    getPosition()
      .then(coordinates => {
        console.log(9, 'zxc', 'coordinates', coordinates);
      })
      .catch();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <View>
          <Text>{'HELLO'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
