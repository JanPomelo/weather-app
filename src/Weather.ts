'use strict';

import { Container } from "postcss";

type condition = {
  code: number,
  icon: string,
  text: string
}

type air_quality = {
  pm2_5: number
}

type current = {
  cloud: number,
  condition: condition,
  feelslike_c: number,
  feelslike_t: number,
  gust_kph: number,
  gust_mph: number,
  humidity: number,
  is_day: number,
  last_updated: string,
  pressure_mb: number,
  temp_c: number,
  temp_f: number,
  uv: number,
  vis_km: number,
  vis_miles: number,
  wind_degree: number,
  wind_dir: string,
  wind_kph: number,
  wind_mph: number,
  air_quality: air_quality
}

type location = {
  country: string,
  lat: number,
  localtime: string,
  lon: number,
  name: string,
  region: string,
  tz_id: string
}

type forecastday = {
  date: string;
  astro: astro;
  day: day;
  hour: hour[];
};

type astro = {
  sunrise: string,
  sunset: string
}

type day = {
  maxtemp_c: number,
  maxtemp_f: number,
  mintemp_c: number,
  mintemp_f: number,
  condition: condition,
  air_quality: air_quality,
  daily_will_it_rain: boolean,
  daily_chance_of_rain: number,
  daily_will_it_snow: boolean,
  daily_chance_of_snow: number,
  totalprecip_mm: number,
  totalsnow_mm: number,
}

type hour = {
  chance_of_rain: number,
  chance_of_snow: number,
  condition: condition,
  temp_c: number,
  temp_f: number,
  time: string,
  will_it_rain: boolean,
  will_it_snow: boolean,

}

type forecast = {
  forecastday: forecastday[]
}

export type WeatherData = {
  current: current,
  location: location,
  forecast: forecast
}

