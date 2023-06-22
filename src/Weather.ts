'use strict';

type condition = {
  code: number,
  icon: string,
  text: string
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
  wind_mph: number
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

export type WeatherData = {
  current: current,
  location: location
}
