"use strict";

import { WeatherData } from "./Weather";

export function fillGeneralData(data: WeatherData): void {
  const city: HTMLHeadingElement = document.querySelector("#city");
  const country: HTMLHeadingElement = document.querySelector("#country");
  const temp_c: HTMLElement = document.querySelector("#temp_c");
  const conditionText: HTMLElement = document.querySelector("#conditionText");
  const time: HTMLElement = document.querySelector("#time");
  city.innerText = data.location.name;
  country.innerText = data.location.country;
  temp_c.innerText = data.current.temp_c.toString() + " °C";
  conditionText.innerText = data.current.condition.text;
  //time.innerText = data.location.localtime.substring(11);
}

export function fillTodayInfo() {
  
}