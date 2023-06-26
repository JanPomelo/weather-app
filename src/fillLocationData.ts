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
  const airQ: HTMLElement = document.querySelector("#airQ");
  const rainSnowExpectedStatic: HTMLElement =
    document.querySelector("#rainSnowStatic");
  const rainSnowPercent: HTMLElement =
    document.querySelector("#rainSnowPercent");
  const sunRise: HTMLElement = document.querySelector("#sunRise");
  const sunSet: HTMLElement = document.querySelector("#sunSet");
  curTime.innerText = data.location.localtime.substring(11);
  airQ.innerText = (
    Math.round(data.current.air_quality.pm2_5 * 100) / 100
  ).toString();
  if (data.forecast.forecastday[0].day.daily_will_it_snow) {
    rainSnowExpectedStatic.innerText = "Snow Probability";
    rainSnowPercent.innerText =
      data.forecast.forecastday[0].day.daily_chance_of_snow.toString() + " %";
  } else {
    rainSnowExpectedStatic.innerText = "Rain Probability";
    rainSnowPercent.innerText =
      data.forecast.forecastday[0].day.daily_chance_of_rain.toString() + " %";
  }
  sunRise.innerText = changeHoursTo24Format(
    data.forecast.forecastday[0].astro.sunrise
  );
  sunSet.innerText = changeHoursTo24Format(
    data.forecast.forecastday[0].astro.sunset
  );
  /*
  const curHumid: HTMLElement = document.querySelector("#curHumid");
  const feelslikeTemp: HTMLElement = document.querySelector("#feelslikeTemp");
  */
  // curHumid.innerText = data.current.humidity + " %";
  // feelslikeTemp.innerText = data.current.feelslike_c.toString() + " °C";
}

function changeHoursTo24Format(hours: string) {
  console.log(hours.substring(6));
  if (hours.substring(6) === "PM") {
    let zs: string[] = hours.split(":");
    let newHours: number = +zs[0] + 12;
    return newHours.toString() + ":" + zs[1].substring(0,2);
  } else {
    return hours.substring(0, 5);
  }
}

export function fillWindAndPressure(data: WeatherData): void {
  const curHumid: HTMLElement = document.querySelector("#curHumid");
  const wind_kph: HTMLElement = document.querySelector("#wind_kph");
  const wind_dir: HTMLElement = document.querySelector("#wind_dir");
  const pressure: HTMLElement = document.querySelector("#pressure_mb");
  curHumid.innerText = data.current.humidity + " %";
  wind_kph.innerText = data.current.wind_kph.toString() + " kph";
  wind_dir.innerText = translateWindDir(data.current.wind_dir);
  pressure.innerText = data.current.pressure_mb.toString() + " mbar";
}
