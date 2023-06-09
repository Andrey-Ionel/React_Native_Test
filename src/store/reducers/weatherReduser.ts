import { SET_WEATHER } from '../actions';
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
};

const weatherReducer = (
  state: WeatherData = <WeatherData>initialState,
  { type, payload },
) => {
  switch (type) {
    case SET_WEATHER:
      return { ...state, weather: payload };
    default:
      return state;
  }
};

export default weatherReducer;
