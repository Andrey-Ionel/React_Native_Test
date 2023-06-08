import React from 'react';

import WeatherContainer from './src/containers/WeatherContainer';
import SearchLocationContainer from './src/containers/SearchLocationContainer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App: () => React.ReactNode = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Weather'}>
        <Stack.Screen
          name="Weather"
          component={WeatherContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchLocationContainer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
