import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const App: () => React.ReactNode = () => {
  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      Geolocation.requestAuthorization('whenInUse').then(status => {
        return status === 'granted';
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const requestLocationPermissionAndroid = async (): Promise<boolean> => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
        .then(res => {
          if (res === 'granted') {
            return true;
          } else {
            console.log('You cannot use Geolocation');
            return false;
          }
        })
        .catch(e => {
          console.log(e);
          return false;
        });
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const isAllowed =
      Platform.OS !== 'android'
        ? requestLocationPermission().catch(error => console.log(error))
        : requestLocationPermissionAndroid().catch(error => console.log(error));

    if (isAllowed) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(50, 'zxc', 'position', position);
        },
        error => {
          // См. таблицы кодов ошибок выше.
          if (error.code === 1) {
            // Platform.OS !== 'android'
            //   ? requestLocationPermission().catch(error => console.log(error))
            //   : requestLocationPermissionAndroid().catch(error =>
            //       console.log(error),
            //     );
          }
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 100000,
        },
      );
    } else {
      return;
    }
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'red' }}>
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <View>
          <Text>{'HELLO'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
