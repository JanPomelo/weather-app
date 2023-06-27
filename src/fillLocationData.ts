"use strict";
import { getDay } from "date-fns";
import { WeatherData } from "./Weather";

type isoAnsi = "°C" | "F";

let isoAnsiToggle: isoAnsi = "°C";
let currentData: WeatherData;

export function toggleIsoAnsi(text: isoAnsi) {
  isoAnsiToggle = text;
  console.log(isoAnsiToggle);
}

const windDirTranslate = [
  { short: "N", long: "North" },
  { short: "E", long: "East" },
  { short: "W", long: "West" },
  { short: "S", long: "South" },
];

const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
    isoAnsiToggle === "°C"
      ? Math.floor(data.forecast.forecastday[0].day.mintemp_c).toString() +
        " °C"
      : Math.floor(data.forecast.forecastday[0].day.mintemp_f).toString() +
        " F";
  curTemp.innerText =
    isoAnsiToggle === "°C"
      ? data.current.temp_c.toString() + " °C"
      : data.current.temp_f.toString() + " F";
  maxTemp.innerText =
    isoAnsiToggle === "°C"
      ? Math.floor(data.forecast.forecastday[0].day.maxtemp_c).toString() +
        " °C"
      : Math.floor(data.forecast.forecastday[0].day.maxtemp_f).toString() +
        " F";
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
  if (hours.substring(6) === "PM") {
    let zs: string[] = hours.split(":");
    let newHours: number = +zs[0] + 12;
    return newHours.toString() + ":" + zs[1].substring(0, 2);
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

export function fillForeCastData(data: WeatherData, day: string): void {
  const heading: HTMLElement = document.querySelector("#" + day);

  let hours: number = 0;
  let i: number;
  if (day === "Today") {
    heading.innerText = day;
    i = 0;
  } else if (day === "Tomorrow") {
    i = 1;
    heading.innerText = `${
      weekDay[getDay(new Date(data.forecast.forecastday[i].date))]
    }, ${data.forecast.forecastday[i].date
      .substring(0, 10)
      .replace("-", "/")
      .replace("-", "/")}`;
  } else {
    i = 2;
    heading.innerText = `${
      weekDay[getDay(new Date(data.forecast.forecastday[i].date))]
    }, ${data.forecast.forecastday[i].date
      .substring(0, 10)
      .replace("-", "/")
      .replace("-", "/")}`;
  }
  for (hours; hours < data.forecast.forecastday[i].hour.length; hours++) {
    const div2Fill: HTMLDivElement = document.querySelector(
      "#" + day + hours.toString()
    );
    const childs: HTMLElement[] = Array.from(
      div2Fill.children
    ) as HTMLElement[];
    childs[0].innerText = data.forecast.forecastday[i].hour[
      hours
    ].time.substring(11, 13);
    const img: HTMLImageElement = document.querySelector(
      "#" + day + hours.toString() + "IMG"
    );
    const rain: HTMLElement = document.querySelector(
      "#" + day + hours.toString() + "Rain"
    );
    img.src = data.forecast.forecastday[i].hour[hours].condition.icon;
    if (data.forecast.forecastday[i].hour[hours].will_it_snow) {
      if (data.forecast.forecastday[i].hour[hours].chance_of_snow !== 0) {
        rain.innerText =
          data.forecast.forecastday[i].hour[hours].chance_of_snow.toString() +
          " %";
      }
    } else if (data.forecast.forecastday[i].hour[hours].chance_of_rain !== 0) {
      rain.innerText =
        data.forecast.forecastday[i].hour[hours].chance_of_rain.toString() +
        " %";
    }
    childs[2].innerText =
      isoAnsiToggle === "°C"
        ? Math.round(
            data.forecast.forecastday[i].hour[hours].temp_c
          ).toString() + " °C"
        : Math.round(
            data.forecast.forecastday[i].hour[hours].temp_f
          ).toString() + " F";
  }
}

export function saveCurrentData(data: WeatherData): void {
  currentData = data;
}

export function fillAllData(): void {
  if (currentData) {
    fillGeneralData(currentData);
    fillTodayInfo(currentData);
    fillWindAndPressure(currentData);
    fillForeCastData(currentData, "Today");
    fillForeCastData(currentData, "Tomorrow");
    fillForeCastData(currentData, "TDaT");
  }
}
