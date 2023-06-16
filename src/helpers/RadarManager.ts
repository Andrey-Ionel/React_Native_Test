import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid } from 'react-native';

import { isAndroid } from './common';

const requestLocationPermissionAndroid = async (): Promise<boolean> => {
  try {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(status => status === 'granted' || status === 'denied');
  } catch (e) {
    return false;
  }
};

const requestLocationPermissionIos = async (): Promise<boolean> => {
  try {
    return await Geolocation.requestAuthorization('whenInUse').then(
      status => status === 'granted' || status === 'denied',
    );
  } catch (e) {
    return false;
  }
};

const getPermission = async (): Promise<boolean> => {
  try {
    if (isAndroid) {
      return await requestLocationPermissionAndroid().then(allowed => allowed);
    } else {
      return await requestLocationPermissionIos().then(allowed => allowed);
    }
  } catch (e) {
    return false;
  }
};

const getCoordinates = (
  isButtonPressed?: boolean,
): Promise<GeoCoordinates | undefined> => {
  const enableMessage = 'Please, enable geolocation in your settings!';
  const deniedMeText = 'You denied me';

  return new Promise(async (resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(coords);
        },
        error => {
          if (error.code === 1 && isButtonPressed) {
            Alert.alert(deniedMeText, enableMessage);
          }
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      resolve(undefined);
    }
  });
};

export const getLocation = async (
  isButtonPressed?: boolean,
): Promise<GeoCoordinates | undefined> => {
  const isAllowed = await getPermission();
  if (!isAllowed) {
    return;
  }
  return await getCoordinates(isButtonPressed);
};
