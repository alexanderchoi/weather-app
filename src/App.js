import React, { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const apikey = `WePKciLBza3MMOL6jjDbBU3ztMrMAAoF`;
  const [locationKey, setLocationKey] = useState("locationKey");
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
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
        return setCurrentWeather(data[0].WeatherText);
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
      <input ref={inputValue} placeholder="Enter City"></input>
      <button onClick={() => getLocationKey(inputValue.current.value)}>
        Search
      </button>
    </div>
  );
}
