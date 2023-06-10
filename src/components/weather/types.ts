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

export interface WeatherDetailCurrent {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherSky[];
}

export interface DailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherDetailDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  pop: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherSky[];
}

export interface WeatherDetailData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherDetailCurrent;
  hourly: WeatherDetailCurrent[];
  daily: WeatherDetailDaily[];
}
