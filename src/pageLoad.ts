"use strict";
import {
  fillGeneralData,
  fillTodayInfo,
  fillWindAndPressure,
} from "./fillLocationData";
import { getData } from "./getWeatherData";
import Background from "./img/background.jpeg";

/* ---------------
BACKGROUND PIC FROM
https://www.pixiv.net/en/users/33558705
*/
const main: HTMLElement = document.querySelector("main");

export function createFirstContent(): void {
  const img: HTMLImageElement = document.createElement("img");
  img.src = Background;
  img.id = "backgroundIMG";
  img.classList.add("h-full", "xl:w-full", "object-cover");
  document.querySelector("body").appendChild(img);
  main.appendChild(createSearchDiv());
  main.appendChild(createContentDiv());
}

function createContentDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "grow",
    "flex",
    "flex-col",
    "gap-3",
    "md:grid",
    "md:grid-cols-2",
    "md:grid-rows-2"
  );
  div.appendChild(createGeneralInformationDiv());
  div.appendChild(createTodayInfo());
  div.appendChild(createWindAndPressure());
  div.appendChild(createForecast());
  return div;
}

function createGeneralInformationDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col", "text-white", "pl-5");
  const city: HTMLHeadingElement = document.createElement("h2");
  city.id = "city";
  city.classList.add("text-5xl", "font-bold");
  const country: HTMLHeadingElement = document.createElement("h3");
  country.id = "country";
  country.classList.add("text-lg", "pl-6", "mb-3", "font-bold");
  const tempInfos: HTMLDivElement = document.createElement("div");
  tempInfos.classList.add("flex", "gap-2", 'items-center');
  const minTempDiv: HTMLDivElement = document.createElement("div");
  minTempDiv.classList.add("flex", 'text-xl', 'items-center');
  const minTempSymbol: HTMLElement = document.createElement("span");
  minTempSymbol.classList.add("material-symbols-outlined", "pb-0.5");
  minTempSymbol.innerText = "Keyboard_Double_Arrow_Down";
  const minTempText: HTMLElement = document.createElement("span");
  minTempText.id = "minTempText";
  const curTemp: HTMLElement = document.createElement("p");
  curTemp.id = "curTemp";
  const maxTempDiv: HTMLDivElement = document.createElement("div");
  maxTempDiv.classList.add("flex", 'text-xl', 'items-center');
  const maxTempSymbol: HTMLElement = document.createElement("span");
  maxTempSymbol.classList.add('material-symbols-outlined', 'pt-0.5');
  maxTempSymbol.innerText = 'Keyboard_Double_Arrow_Up';
  const maxTempText: HTMLElement = document.createElement("span");
  maxTempText.id = "maxTempText";
  curTemp.classList.add("text-4xl");
  const condition: HTMLDivElement = document.createElement("div");
  condition.classList.add("flex", "gap-3", "items-center");
  const conditionText: HTMLElement = document.createElement("p");
  conditionText.id = "conditionText";
  conditionText.classList.add("text-xl", "pl-1", "font-bold");
  const conditionPic: HTMLImageElement = document.createElement("img");
  conditionPic.id = "conditionPic";
  conditionPic.classList.add("h-10");
  const time: HTMLElement = document.createElement("p");
  time.id = "time";
  div.appendChild(city);
  div.appendChild(country);
  div.appendChild(tempInfos);
  tempInfos.appendChild(minTempDiv);
  minTempDiv.appendChild(minTempSymbol);
  minTempDiv.appendChild(minTempText);
  tempInfos.appendChild(curTemp);
  tempInfos.appendChild(maxTempDiv);
  maxTempDiv.appendChild(maxTempSymbol);
  maxTempDiv.appendChild(maxTempText);
  div.appendChild(condition);
  condition.appendChild(conditionText);
  condition.appendChild(conditionPic);
  div.appendChild(time);
  city.innerText = "Bangkok";
  country.innerText = "Thailand";
  minTempText.innerText = '28 °C';
  maxTempText.innerText = "38 °C";
  curTemp.innerText = "36 °C";
  conditionText.innerText = "party snoudy";
  return div;
}

function createTodayInfo(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add("flex", "flex-col", "gap-1");
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-2xl", "pl-5");
  heading.innerText = "More Informations";
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "grid",
    "grid-cols-2",
    "text-white",
    "pl-5",
    "rounded-xl",
    "bg-black",
    "bg-opacity-30",
    "gap-x-2"
  );
  const curTimeStatic: HTMLElement = document.createElement("p");
  curTimeStatic.innerText = "Local Time";
  curTimeStatic.classList.add("font-bold", "text-lg");
  const curTime: HTMLElement = document.createElement("p");
  curTime.id = "curTime";
  curTime.classList.add("font-bold", "text-lg");
  const curHumidStatic: HTMLElement = document.createElement("p");
  curHumidStatic.innerText = "Humidity";
  curHumidStatic.classList.add("font-bold", "text-lg");
  const curHumid: HTMLElement = document.createElement("p");
  curHumid.id = "curHumid";
  curHumid.classList.add("font-bold", "text-lg");
  const feelsLike_Static: HTMLElement = document.createElement("p");
  feelsLike_Static.innerText = "Feels like";
  feelsLike_Static.classList.add("font-bold", "text-lg");
  const feelsLike_C: HTMLElement = document.createElement("p");
  feelsLike_C.id = "feelslike_c";
  feelsLike_C.classList.add("font-bold", "text-lg");
  const airQStatic: HTMLElement = document.createElement("p");
  airQStatic.innerText = "Air Quality (PM 2.5)";
  airQStatic.classList.add("font-bold", "text-lg");
  const airQ: HTMLElement = document.createElement("p");
  airQ.id = "airQ";
  airQ.classList.add("font-bold", "text-lg");
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  div.appendChild(curTimeStatic);
  div.appendChild(curTime);
  div.appendChild(curHumidStatic);
  div.appendChild(curHumid);
  div.appendChild(feelsLike_Static);
  div.appendChild(feelsLike_C);
  div.appendChild(airQStatic);
  div.appendChild(airQ);
  return bigDiv;
}

function createWindAndPressure(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add("flex", "flex-col", "gap-1");
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-2xl", "pl-5");
  heading.innerText = "Wind and Pressure";
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "grid",
    "grid-cols-2",
    "text-white",
    "pl-5",
    "rounded-xl",
    "bg-black",
    "bg-opacity-30",
    "gap-x-2"
  );
  const wind_kphStatic: HTMLElement = document.createElement("p");
  wind_kphStatic.innerText = "Wind speed";
  wind_kphStatic.classList.add("font-bold", "text-lg");
  const wind_kph: HTMLElement = document.createElement("p");
  wind_kph.id = "wind_kph";
  wind_kph.classList.add("font-bold", "text-lg");
  const wind_dirStatic: HTMLElement = document.createElement("p");
  wind_dirStatic.innerText = "Wind Direction";
  wind_dirStatic.classList.add("font-bold", "text-lg");
  const wind_dir: HTMLElement = document.createElement("p");
  wind_dir.id = "wind_dir";
  wind_dir.classList.add("font-bold", "text-lg");
  const pressure_static: HTMLElement = document.createElement("p");
  pressure_static.innerText = "Air Pressure";
  pressure_static.classList.add("font-bold", "text-lg");
  const pressure_mb: HTMLElement = document.createElement("p");
  pressure_mb.id = "pressure_mb";
  pressure_mb.classList.add("font-bold", "text-lg");
  div.appendChild(wind_dirStatic);
  div.appendChild(wind_dir);
  div.appendChild(wind_kphStatic);
  div.appendChild(wind_kph);
  div.appendChild(pressure_static);
  div.appendChild(pressure_mb);
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  return bigDiv;
}

function createForecast(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add(
    "flex",
    "flex-col",
    "gap-1",
    "border-t-4",
    "border-white",
    "md:border-0"
  );
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-4xl", "pl-5");
  heading.innerText = "Forecast";
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add();
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  return bigDiv;
}

function createSearchDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "searchDiv";
  div.classList.add(
    "flex",
    "rounded-3xl",
    "h-12",
    "mx-4",
    "md:justify-end",
    "md:mr-10"
  );
  div.appendChild(createInputField());
  div.appendChild(createInputButton());
  return div;
}

function createInputField(): HTMLInputElement {
  const userInput: HTMLInputElement = document.createElement("input");
  userInput.type = "text";
  userInput.classList.add(
    "grow",
    "md:grow-0",
    "rounded-l-3xl",
    "pl-4",
    "text-xl"
  );
  return userInput;
}

function createInputButton(): HTMLButtonElement {
  const inputButton: HTMLButtonElement = document.createElement("button");
  inputButton.innerText = "search";
  inputButton.classList.add(
    "px-2",
    "rounded-r-3xl",
    "material-symbols-outlined"
  );
  inputButton.addEventListener("click", () => {
    const inputField: HTMLInputElement = document.querySelector("input");
    getData(inputField.value).then((data) => {
      console.log(data);
      fillGeneralData(data);
      fillTodayInfo(data);
      fillWindAndPressure(data);
    });
  });
  return inputButton;
}
