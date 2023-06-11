import { SET_ERROR, SET_UNIT, SET_WEATHER } from '../actions';
import { WeatherData } from '../../components/weather';

const initialState = {
  weather: {
    coord: {},
    weather: [],
    base: '',
    main: {},
    visibility: 0,
    wind: {},
    clouds: {},
    dt: 0,
    sys: {},
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  },
  error: '',
  unit: 'metric',
};

const weatherReducer = (
  state: WeatherData = <WeatherData>initialState,
  { type, payload },
) => {
  switch (type) {
    case SET_WEATHER:
      return { ...state, weather: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_UNIT:
      return { ...state, unit: payload };
    default:
      return state;
  }
};

export default weatherReducer;
