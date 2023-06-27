import { fillAllData, saveCurrentData } from "./fillLocationData";
import { getData } from "./getWeatherData";

const successful = (position: GeolocationPosition): void => {
  let currPos: string = '';
  currPos = position.coords.latitude.toString() + ',' + position.coords.longitude.toString();
  getData(currPos).then((data) => {
    saveCurrentData(data)
    fillAllData();
  }
  )
}

const error = (error: GeolocationPositionError): void => {
  console.log(error);
  getData('London').then((data) => {
    saveCurrentData(data);
    fillAllData();
  });
}

export function getLocation(): void  {
  return navigator.geolocation.getCurrentPosition(successful, error);
}

