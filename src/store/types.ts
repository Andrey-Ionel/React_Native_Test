import { WeatherData } from '../components/weather';

export type Unit = 'metric' | 'imperial';

export interface ReduxWeatherData {
  weather: WeatherData;
  error: string;
  unit: Unit;
}

type CombinedPayloads = WeatherData | string | Unit;
export interface ActionReducer {
  type: string;
  payload: CombinedPayloads;
}
