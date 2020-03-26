// By pressing enter, the user submits the name of the city which updates the DOM with the temperature, weather condition, image of day or night and weather condition icon.
// press enter to search
// display day or night

import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const apikey = `WePKciLBza3MMOL6jjDbBU3ztMrMAAoF`;
  const [locationKey, setLocationKey] = useState("locationKey");
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [isDay, setIsDay] = useState(null);
  const inputValue = useRef(null);

  const getWeather = key => {
    key = key.toString();
    fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/351409?apikey=${apikey}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setCurrentWeather(data[0].WeatherText);
        setTemp(
          data[0].Temperature.Imperial.Value + data[0].Temperature.Imperial.Unit
        );
        setIsDay(data[0].IsDayTime);
        return;
      });
  };

  const getLocationKey = city => {
    setCity(city);
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${city}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setLocationKey(data[0].Key);
        getWeather(data[0].Key);
      });
  };
  return (
    <div className="App">
      {/* <p>location key: {locationKey}</p> */}
      <p>City: {city}</p>
      <p>Current Weather: {currentWeather}</p>
      <p>Temp: {temp}</p>
      <input ref={inputValue} placeholder="Enter City"></input>
      <button onClick={() => getLocationKey(inputValue.current.value)}>
        Search
      </button>
    </div>
  );
}
