"use strict";

import { WeatherData } from "./Weather";

const windDirTranslate = [
  { short: "N", long: "North" },
  { short: "E", long: "East" },
  { short: "W", long: "West" },
  { short: "S", long: "South" },
];

function translateWindDir(shortVersion: string): string {
  let longWindDir: string = "";
  for (let i = 0; i < shortVersion.length; i++) {
    for (let j = 0; j < windDirTranslate.length; j++) {
      if (shortVersion.substring(i, i + 1) === windDirTranslate[j].short) {
        longWindDir = longWindDir.concat(windDirTranslate[j].long, "-");
      }
    }
  }
  return longWindDir.substring(0, longWindDir.length - 1);
}

export function fillGeneralData(data: WeatherData): void {
  const city: HTMLHeadingElement = document.querySelector("#city");
  const country: HTMLHeadingElement = document.querySelector("#country");
  const minTemp: HTMLElement = document.querySelector("#minTempText");
  const curTemp: HTMLElement = document.querySelector("#curTemp");
  const maxTemp: HTMLElement = document.querySelector("#maxTempText");
  const conditionText: HTMLElement = document.querySelector("#conditionText");
  const conditionPic: HTMLImageElement =
    document.querySelector("#conditionPic");
  city.innerText = data.location.name;
  country.innerText = data.location.country;
  minTemp.innerText =
    Math.floor(data.forecast.forecastday[0].day.mintemp_c).toString() + " °C";
  curTemp.innerText = data.current.temp_c.toString() + " °C";
  maxTemp.innerText =
    Math.round(data.forecast.forecastday[0].day.maxtemp_c).toString() + " °C";
  conditionText.innerText = data.current.condition.text;
  conditionPic.src = data.current.condition.icon;
}

export function fillTodayInfo(data: WeatherData): void {
  const curTime: HTMLElement = document.querySelector("#curTime");
  const curHumid: HTMLElement = document.querySelector("#curHumid");
  const feelslike_c: HTMLElement = document.querySelector("#feelslike_c");
  const airQ: HTMLElement = document.querySelector("#airQ");
  curTime.innerText = data.location.localtime.substring(11);
  curHumid.innerText = data.current.humidity + " %";
  feelslike_c.innerText = data.current.feelslike_c.toString() + " °C";
  airQ.innerText = (
    Math.round(data.current.air_quality.pm2_5 * 100) / 100
  ).toString();
}

export function fillWindAndPressure(data: WeatherData): void {
  const wind_kph: HTMLElement = document.querySelector("#wind_kph");
  const wind_dir: HTMLElement = document.querySelector("#wind_dir");
  const pressure: HTMLElement = document.querySelector("#pressure_mb");
  wind_kph.innerText = data.current.wind_kph.toString() + " kph";
  wind_dir.innerText = translateWindDir(data.current.wind_dir);
  pressure.innerText = data.current.pressure_mb.toString() + " mbar";
}
