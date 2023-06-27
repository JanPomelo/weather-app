"use strict";
import dropDown from "./dropDownTailwind";
import { saveCurrentData, fillAllData } from "./fillLocationData";
import { getData } from "./getWeatherData";
import Background from "./img/background.jpeg";
import { createForecast } from "./ForeCastCreate";
import { toggleIsoAnsi } from "./fillLocationData";
import { getLocation } from "./currentPosition";

/* ---------------
BACKGROUND PIC FROM
https://www.pixiv.net/en/users/33558705
*/
const main: HTMLElement = document.querySelector("main");

export function createFirstContent(): void {
  const img: HTMLImageElement = document.createElement("img");
  img.src = Background;
  img.id = "backgroundIMG";
  img.classList.add("h-full", "w-full", "object-cover");
  document.querySelector("body").appendChild(img);
  main.appendChild(createSearchandApiDiv());
  main.appendChild(createContentDiv());
  getLocation();
}

function createContentDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "md:grid",
    "md:grid-cols-2",
    "px-3",
    "overflow-scroll",
    "h-4/5",
    "md:grow",
    "md:overflow-auto"
  );
  div.appendChild(createGeneralInformationDiv());
  const todayDiv: HTMLDivElement = document.createElement("div");
  todayDiv.classList.add("flex", "flex-col", "gap-5");
  div.appendChild(todayDiv);
  todayDiv.appendChild(createTodayInfo());
  todayDiv.appendChild(createMoreInformation());
  div.appendChild(createForecast());
  return div;
}

function createGeneralInformationDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col", "text-white", "pl-3");
  const city: HTMLHeadingElement = document.createElement("h2");
  city.id = "city";
  city.classList.add("text-5xl", "font-bold");
  const country: HTMLHeadingElement = document.createElement("h3");
  country.id = "country";
  country.classList.add("text-lg", "pl-6", "mb-3", "font-bold");
  const tempInfos: HTMLDivElement = document.createElement("div");
  tempInfos.classList.add("flex", "gap-2", "items-center");
  const minTempDiv: HTMLDivElement = document.createElement("div");
  minTempDiv.classList.add("flex", "text-xl", "items-center");
  const minTempSymbol: HTMLElement = document.createElement("span");
  minTempSymbol.classList.add("material-symbols-outlined", "pb-0.5");
  minTempSymbol.innerText = "Keyboard_Double_Arrow_Down";
  const minTempText: HTMLElement = document.createElement("span");
  minTempText.id = "minTempText";
  const curTemp: HTMLElement = document.createElement("p");
  curTemp.id = "curTemp";
  const maxTempDiv: HTMLDivElement = document.createElement("div");
  maxTempDiv.classList.add("flex", "text-xl", "items-center");
  const maxTempSymbol: HTMLElement = document.createElement("span");
  maxTempSymbol.classList.add("material-symbols-outlined", "pt-0.5");
  maxTempSymbol.innerText = "Keyboard_Double_Arrow_Up";
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
  return div;
}

function createTodayInfo(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add("flex", "flex-col", "gap-1");
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-2xl", "pl-3");
  heading.innerText = "Today";
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "grid",
    "grid-cols-2",
    "text-white",
    "pl-3",
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
  const rainSnowExpectedStatic: HTMLElement = document.createElement("p");
  rainSnowExpectedStatic.id = "rainSnowStatic";
  rainSnowExpectedStatic.classList.add("font-bold", "text-lg");
  const rainSnowPercent: HTMLElement = document.createElement("p");
  rainSnowPercent.id = "rainSnowPercent";
  rainSnowPercent.classList.add("font-bold", "text-lg");
  const astroInfoStatic: HTMLElement = document.createElement("p");
  astroInfoStatic.classList.add("font-bold", "text-lg");
  astroInfoStatic.innerText = "Sunrise / Sunset";
  const astroInfo: HTMLElement = document.createElement("div");
  astroInfo.classList.add(
    "font-bold",
    "text-lg",
    "flex",
    "items-center",
    "flex-wrap"
  );
  const sunRiseSymbol: HTMLElement = document.createElement("span");
  sunRiseSymbol.classList.add("material-symbols-outlined", "text-sm");
  sunRiseSymbol.innerText = "Sunny";
  const sunRiseText: HTMLElement = document.createElement("span");
  sunRiseText.id = "sunRise";
  sunRiseText.classList.add("mr-3");
  const sunSetSymbol: HTMLElement = document.createElement("span");
  sunSetSymbol.classList.add("material-symbols-outlined", "text-sm");
  sunSetSymbol.innerText = "wb_twilight";
  const sunSetText: HTMLElement = document.createElement("span");
  sunSetText.id = "sunSet";
  /*
  const feelsLike_Static: HTMLElement = document.createElement("p");
  feelsLike_Static.innerText = "Feels like";
  feelsLike_Static.classList.add("font-bold", "text-lg");
  const feelsLikeTemp: HTMLElement = document.createElement("p");
  feelsLikeTemp.id = "feelslikeTemp";
  feelsLikeTemp.classList.add("font-bold", "text-lg");
  */
  const airQStatic: HTMLElement = document.createElement("p");
  airQStatic.innerText = "Air Quality PM 2.5";
  airQStatic.classList.add("font-bold", "text-lg");
  const airQ: HTMLElement = document.createElement("p");
  airQ.id = "airQ";
  airQ.classList.add("font-bold", "text-lg");
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  div.appendChild(rainSnowExpectedStatic);
  div.appendChild(rainSnowPercent);
  div.appendChild(airQStatic);
  div.appendChild(airQ);
  div.appendChild(curTimeStatic);
  div.appendChild(curTime);
  div.appendChild(astroInfoStatic);
  div.appendChild(astroInfo);
  astroInfo.appendChild(sunRiseSymbol);
  astroInfo.appendChild(sunRiseText);
  astroInfo.appendChild(sunSetSymbol);
  astroInfo.appendChild(sunSetText);
  return bigDiv;
}

function createMoreInformation(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add("flex", "flex-col", "gap-1");
  const headingDiv: HTMLDivElement = document.createElement("div");
  headingDiv.classList.add("flex", "gap-1");
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-2xl", "pl-3");
  heading.innerText = "More Information";
  const dropDownMoreInfo: HTMLButtonElement = document.createElement("button");
  dropDownMoreInfo.classList.add(
    "material-symbols-outlined",
    "bg-transparent",
    "text-white",
    "text-3xl"
  );
  dropDownMoreInfo.innerText = "keyboard_arrow_down";
  dropDownMoreInfo.id = "dropDownMoreInfo";
  const div: HTMLDivElement = document.createElement("div");
  dropDown(dropDownMoreInfo, div, "7rem", 500, "ease-in");
  dropDownMoreInfo.addEventListener("click", () => {
    toggleDropDownLogo(dropDownMoreInfo);
  });
  div.classList.add(
    "grid",
    "grid-cols-2",
    "text-white",
    "pl-3",
    "rounded-xl",
    "bg-black",
    "bg-opacity-30",
    "gap-x-2",
    "overflow-hidden",
    "h-0"
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
  const curHumidStatic: HTMLElement = document.createElement("p");
  curHumidStatic.innerText = "Humidity";
  curHumidStatic.classList.add("font-bold", "text-lg");
  const curHumid: HTMLElement = document.createElement("p");
  curHumid.id = "curHumid";
  curHumid.classList.add("font-bold", "text-lg");
  div.appendChild(curHumidStatic);
  div.appendChild(curHumid);
  div.appendChild(wind_dirStatic);
  div.appendChild(wind_dir);
  div.appendChild(wind_kphStatic);
  div.appendChild(wind_kph);
  div.appendChild(pressure_static);
  div.appendChild(pressure_mb);
  bigDiv.appendChild(headingDiv);
  headingDiv.appendChild(heading);
  headingDiv.appendChild(dropDownMoreInfo);
  bigDiv.appendChild(div);
  return bigDiv;
}

function toggleDropDownLogo(button: HTMLButtonElement): void {
  if (button.innerText === "keyboard_arrow_down") {
    button.innerText = "keyboard_arrow_up";
  } else {
    button.innerText = "keyboard_arrow_down";
  }
}

function createAPIDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "text-white",
    "flex",
    "text-sm",
    "justify-between",
    "px-4",
    "mt-2",
    "items-center",
    "md:justify-start",
    "md:gap-2"
  );
  const text: HTMLElement = document.createElement("p");
  const logo: HTMLImageElement = document.createElement("img");
  const anchorLogo: HTMLAnchorElement = document.createElement("a");
  //const menu: HTMLButtonElement = document.createElement("button");
  //menu.innerText = "Menu";
  /*menu.classList.add(
    "bg-white",
    "p-1",
    "text-black",
    "rounded-xl",
    "border-2",
    "border-gray-900",
    "w-12"
  ); */
  text.innerHTML =
    'Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>';
  anchorLogo.href = "https://www.weatherapi.com/";
  anchorLogo.classList.add("bg-white/50", "p-1", "rounded-lg");
  logo.src = "//cdn.weatherapi.com/v4/images/weatherapi_logo.png";
  logo.alt = "Weather data by WeatherAPI.com";
  logo.classList.add("h-6");
  anchorLogo.appendChild(logo);
  //div.appendChild(menu);
  div.appendChild(text);
  div.appendChild(anchorLogo);
  return div;
}

function createSearchandApiDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("md:flex", "md:justify-between", "md:flex-row-reverse");
  div.style.backgroundImage = Background;
  div.appendChild(createSearchDiv());
  div.appendChild(createAPIDiv());
  return div;
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
    "md:mr-10",
    "items-center"
  );
  div.appendChild(createIsoAnsiDiv());
  div.appendChild(createInputField());
  div.appendChild(createInputButton());
  return div;
}

function createIsoAnsiDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col");
  const ansi: HTMLButtonElement = document.createElement("button");
  ansi.innerText = "F";
  ansi.classList.add(
    "mr-2",
    "px-1",
    "rounded-t-xl",
    "w-12",
    "bg-white",
    "text-sm",
    "border-t-2",
    "border-l-2",
    "border-r-2",
    "border-gray-900"
  );
  const iso: HTMLButtonElement = document.createElement("button");
  iso.innerText = "°C";
  iso.classList.add(
    "mr-2",
    "px-1",
    "bg-gray-300",
    "rounded-b-xl",
    "w-12",
    "text-sm",
    "border-t",
    "border-black",
    "border-b-2",
    "border-l-2",
    "border-r-2",
    "border-gray-900"
  );
  ansi.addEventListener("click", function toggleF() {
    toggleIsoAnsi("F");
    ansi.classList.remove("bg-white");
    ansi.classList.add("bg-gray-300");
    iso.classList.remove("bg-gray-300");
    iso.classList.add("bg-white");
    ansi.removeEventListener("click", toggleF);
    fillAllData();
    iso.addEventListener("click", function toggleC() {
      toggleIsoAnsi("°C");
      ansi.classList.add("bg-white");
      ansi.classList.remove("bg-gray-300");
      iso.classList.add("bg-gray-300");
      iso.classList.remove("bg-white");
      iso.removeEventListener("click", toggleC);
      ansi.addEventListener("click", toggleF);
      fillAllData();
    });
  });
  div.appendChild(ansi);
  div.appendChild(iso);
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
    "text-xl",
    "h-full",
    "lg:w-96"
  );
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getData(userInput.value).then((data) => {
        saveCurrentData(data);
        fillAllData();
      });
    }
  });
  return userInput;
}

function createInputButton(): HTMLButtonElement {
  const inputButton: HTMLButtonElement = document.createElement("button");
  inputButton.innerText = "search";
  inputButton.classList.add(
    "px-2",
    "rounded-r-3xl",
    "material-symbols-outlined",
    "h-full"
  );
  inputButton.addEventListener("click", () => {
    const inputField: HTMLInputElement = document.querySelector("input");
    getData(inputField.value).then((data) => {
      saveCurrentData(data);
      fillAllData();
    });
  });
  return inputButton;
}
