"use strict";
import { fillGeneralData } from "./fillLocationData";
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
  div.classList.add("grow", "grid", "md:grid-cols-2", "md:grid-rows-2");
  div.appendChild(createGeneralInformationDiv());
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
  const temp_c: HTMLElement = document.createElement("p");
  temp_c.id = "temp_c";
  temp_c.classList.add("text-4xl");
  const conditionText: HTMLElement = document.createElement("p");
  conditionText.id = "conditionText";
  conditionText.classList.add("text-2xl", "pl-1", "font-bold", "mt-1");
  const time: HTMLElement = document.createElement("p");
  time.id = "time";
  div.appendChild(city);
  div.appendChild(country);
  div.appendChild(temp_c);
  div.appendChild(conditionText);
  div.appendChild(time);
  city.innerText = "Bangkok";
  country.innerText = "Thailand";
  temp_c.innerText = "36 °C";
  conditionText.innerText = "party snoudy";
  return div;
}

function createTodayInfo(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col", "text-white", "pl-5");
  const curTime: HTMLElement = document.createElement("p");
  curTime.id = "curTime";
  const curHumid: HTMLElement = document.createElement("p");
  curHumid.id = "curHumid";
  const wind_kph: HTMLElement = document.createElement("p");
  wind_kph.id = "wind_kph";
  const wind_dir: HTMLElement = document.createElement("p");
  wind_dir.id = "wind_dir";
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
    });
  });
  return inputButton;
}
