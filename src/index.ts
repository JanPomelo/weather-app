import "./style.css";
import { getData } from "./getWeatherData";
import { createFirstContent } from "./pageLoad";

/*async function getData(place: string) {
  try {
    const url: string = `https://api.weatherapi.com/v1/current.json?key=381d192e0f6a4b4f82b42439232106&q=${place}`;
    const response: Response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error('HTTP Status Code: ' + response.status);
    }
    const data: Promise<Object> = response.json();

  } catch (err) {
    console.log("Can't get the data.", err);
  }
}
*/

createFirstContent();

//getData("Bangkok");
