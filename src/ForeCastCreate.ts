export function createForecast(): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add(
    "flex",
    "flex-col",
    "gap-1",
    "border-t-4",
    "border-white",
    "md:border-0",
    "md:col-span-2"
  );
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-5xl", "pl-5");
  heading.innerText = "Forecast";
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col");
  div.appendChild(createForeCast("Today"));
  div.appendChild(createForeCast("Tomorrow"));
  div.appendChild(createForeCast("TDaT"));
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  return bigDiv;
}

function createForeCast(day: string): HTMLDivElement {
  const bigDiv: HTMLDivElement = document.createElement("div");
  bigDiv.classList.add(
    "flex",
    "flex-col",
    "gap-1",
    "rounded-xl",
    "bg-black",
    "bg-opacity-30",
    "gap-x-2",
    "my-3",
    'xl:mr-auto'
  );
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.classList.add("text-white", "font-bold", "text-3xl", "pl-5");
  heading.innerText = day;
  heading.id = day;
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "gap-3", "overflow-scroll", 'xl:overflow-auto', "px-5", 'rounded-xl', 'text-white');
  createHourlyInfoDivs(div, day);
  bigDiv.appendChild(heading);
  bigDiv.appendChild(div);
  return bigDiv;
}

function createHourlyInfoDivs(bigDiv: HTMLDivElement, day: string): void {
  for (let i = 0; i < 24; i++) {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("flex", "flex-col", "my-3", "p-1", "rounded-lg",'hourly-divs','font-bold', 'items-center');
    div.id = day + i.toString();
    const time: HTMLElement = document.createElement("p");
    const temp: HTMLElement = document.createElement("p");
    const rainAndCondition: HTMLDivElement = document.createElement("div");
    rainAndCondition.classList.add("flex", "flex-col",'mb-1');
    const condition: HTMLImageElement = document.createElement("img");
    condition.id = day + i.toString() + "IMG";
    condition.classList.add()
    const rain: HTMLElement = document.createElement("p");
    rain.id = day + i.toString() + "Rain";
    rain.classList.add('h-5')
    div.appendChild(time);
    div.appendChild(rainAndCondition);
    rainAndCondition.appendChild(condition);
    rainAndCondition.appendChild(rain);
    div.appendChild(temp);
    bigDiv.appendChild(div);
  }
}
