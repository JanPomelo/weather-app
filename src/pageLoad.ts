"use strict";
import { getData } from "./getWeatherData";

const main: HTMLElement = document.querySelector("main");

export function createFirstContent(): void {
  main.appendChild(createSearchDiv());
  main.appendChild(createContentDiv());
}

function createContentDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("grow");
  return div;
}

function createSearchDiv(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "searchDiv";
  div.classList.add("flex", "rounded-3xl", "h-12", "mx-4");
  div.appendChild(createInputField());
  div.appendChild(createInputButton());
  return div;
}

function createInputField(): HTMLInputElement {
  const userInput: HTMLInputElement = document.createElement("input");
  userInput.type = "text";
  userInput.classList.add("grow", "rounded-l-3xl", "pl-4", "text-xl");
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
    getData(inputField.value);
  });
  return inputButton;
}
