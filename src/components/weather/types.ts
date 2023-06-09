export interface WeatherCoordinate {
  lon: number;
  lat: number;
}

export interface WeatherSky {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherOptions {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherRegion {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: WeatherCoordinate;
  weather: WeatherSky[];
  base: string;
  main: WeatherOptions;
  visibility: number;
  wind: WeatherWind;
  clouds: {};
  dt: number;
  sys: WeatherRegion;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDataByCity {
  list: WeatherData[];
}
