import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

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
    ).then(status => status === 'granted');
  } catch (e) {
    return false;
  }
};

const requestLocationPermissionIos = async (): Promise<boolean> => {
  try {
    return await Geolocation.requestAuthorization('whenInUse').then(
      status => status === 'granted',
    );
  } catch (e) {
    return false;
  }
};

const getPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      return await requestLocationPermissionAndroid().then(allowed => allowed);
    } else {
      return await requestLocationPermissionIos().then(allowed => allowed);
    }
  } catch (e) {
    return false;
  }
};

const getCoordinates = (): Promise<GeoCoordinates> => {
  return new Promise(async (resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(coords);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 100000,
        },
      );
    } catch (error) {
      resolve(undefined);
    }
  });
};

export const getPosition = async (): Promise<GeoCoordinates> => {
  const isAllowed = await getPermission();
  if (!isAllowed) {
    return;
  }
  return await getCoordinates();
};
