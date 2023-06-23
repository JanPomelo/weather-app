"use strict";
import { WeatherData } from "./Weather";
import { request } from "./fetchRequests";


export async function getData(place: string): Promise<WeatherData> {
  const url: string = `https://api.weatherapi.com/v1/current.json?key=381d192e0f6a4b4f82b42439232106&q=${place}`;

  const data: WeatherData = await request<WeatherData>(url, {
    method: "GET",
    mode: "cors",
  });
  return data;
}
