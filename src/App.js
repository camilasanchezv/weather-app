import React, { useState } from "react";
import './App.css';
import unknown from "./assets/unknown.png"

const api = {
  key: "de1b7bd57bea6728e0a9536657e5826e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 18)
          ? "App warm"
          : "App")
        : "App"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="day-box">
              <div className="weather-box">
                <div className="icon">
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}></img>
                </div>
                <div className="temp">
                  {Math.round(weather.main.temp)}ºC
                  </div>
                <div className="weather">
                  {weather.weather[0].description}
                </div>
              </div>

              <div className="moreinfo-box">
                <div className="min-max">
                  <h1 className="more-info">
                    {Math.round(weather.main.temp_max)}ºC
                        <a>max</a>
                  </h1>
                  <h1 className="more-info">
                    {Math.round(weather.main.temp_min)}ºC
                        <a>min</a>
                  </h1>
                </div>
                <h1 className="more-info">
                  <a>Feels Like:</a> {Math.round(weather.main.feels_like)}ºC
                  </h1>
                <h1 className="more-info">
                  <a>Humidity:</a> {Math.round(weather.main.humidity)}%
                  </h1>
              </div>

            </div>
          </div>
        ) : ("")}
      </main>
    </div >
  );
}

export default App;
