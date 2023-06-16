import { SET_ERROR, SET_UNIT, SET_WEATHER } from '../actions';
import {
  WeatherData,
  WeatherOptions,
  WeatherRegion,
  WeatherWind,
} from '../../components/weather';
import { ActionReducer, ReduxWeatherData, Unit } from '../types';

const initialState: ReduxWeatherData = {
  weather: {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [],
    base: '',
    main: {} as WeatherOptions,
    visibility: 0,
    wind: {} as WeatherWind,
    clouds: {},
    dt: 0,
    sys: {} as WeatherRegion,
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  },
  error: '',
  unit: 'metric',
};

const weatherReducer = (
  state: ReduxWeatherData = initialState,
  { type, payload }: ActionReducer,
) => {
  switch (type) {
    case SET_WEATHER:
      return { ...state, weather: payload as WeatherData };
    case SET_ERROR:
      return { ...state, error: payload as string };
    case SET_UNIT:
      return { ...state, unit: payload as Unit };
    default:
      return state;
  }
};

export default weatherReducer;
