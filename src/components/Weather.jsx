

// import { useState } from "react";

// import humidity from "../assets/humidity.png";
// import wind from "../assets/wind.png";
// import clear from "../assets/clear.png";
// import clouds from "../assets/clouds.png";
// import drizzle from "../assets/drizzle.png";
// import mist from "../assets/mist.png";
// import rain from "../assets/rain.png";
// // Add search.png only if you place it in assets
// import search from "../assets/search.png";


// const apiKey = "3393d69d5fe8d4a2d4ee18ce847591ca";
// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// function Weather() {
//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState(false);
//   const [weatherIcon, setWeatherIcon] = useState(clear);

//   async function checkWeather() {
//     const response = await fetch(
//       apiUrl + city + `&appid=${apiKey}`
//     );

//     if (response.status === 404) {
//       setError(true);
//       setWeatherData(null);
//       return;
//     }

//     const data = await response.json();

//     if (data.weather[0].main === "Clouds") {
//       setWeatherIcon(clouds);
//     } else if (data.weather[0].main === "Clear") {
//       setWeatherIcon(clear);
//     } else if (data.weather[0].main === "Rain") {
//       setWeatherIcon(rain);
//     } else if (data.weather[0].main === "Drizzle") {
//       setWeatherIcon(drizzle);
//     } else if (data.weather[0].main === "Mist") {
//       setWeatherIcon(mist);
//     }

//     setWeatherData(data);
//     setError(false);
//   }

//   return (
//     <div className="card">
//       <div className="search">
//         <input
//           type="text"
//           placeholder="Enter city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           onKeyUp={(e) =>
//             e.key === "Enter" && checkWeather()
//           }
//         />

//         <button onClick={checkWeather}>
//           <img src={search} alt="" />
//         </button>
//       </div>

//       {error && (
//         <div className="error">
//           Invalid city name
//         </div>
//       )}

//       {weatherData && (
//         <div className="weather">
//           <img
//             src={weatherIcon}
//             className="weather-icon"
//             alt=""
//           />

//           <h1 className="temp">
//             {Math.round(weatherData.main.temp)}°C
//           </h1>

//           <h2 className="city">
//             {weatherData.name}
//           </h2>

//           <div className="details">
//             <div className="col">
//               <img src={humidity} alt="" />
//               <div>
//                 <p className="humidity">
//                   {weatherData.main.humidity}%
//                 </p>
//                 <p>Humidity</p>
//               </div>
//             </div>

//             <div className="col">
//               <img src={wind} alt="" />
//               <div>
//                 <p className="wind">
//                   {weatherData.wind.speed} km/h
//                 </p>
//                 <p>Wind Speed</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Weather;


import { useState } from "react";

import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import clear from "../assets/clear.png";
import clouds from "../assets/clouds.png";
import drizzle from "../assets/drizzle.png";
import mist from "../assets/mist.png";
import rain from "../assets/rain.png";
// Add search.png only if you place it in assets
import search from "../assets/search.png";

const apiKey = "3393d69d5fe8d4a2d4ee18ce847591ca";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(clear);

  async function fetchWeather(cityName) {
    if (!cityName) return;

    try {
      const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();

      switch (data.weather[0].main) {
        case "Clouds": setWeatherIcon(clouds); break;
        case "Clear": setWeatherIcon(clear); break;
        case "Rain": setWeatherIcon(rain); break;
        case "Drizzle": setWeatherIcon(drizzle); break;
        case "Mist": setWeatherIcon(mist); break;
        default: setWeatherIcon(clear);
      }

      setWeatherData(data);
      setError(false);
    } catch {
      setError(true);
      setWeatherData(null);
    }
  }

  return (
    <div className="card">
      {/* Search bar always visible */}
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && fetchWeather(city)}
        />
        <button onClick={() => fetchWeather(city)}>
          <img src={search} alt="search" />
        </button>
      </div>

      {/* Error message if invalid */}
      {error && <div className="error">Invalid city name</div>}

      {/* Weather UI only after search success */}
      {weatherData && (
        <div className="weather">
          <img src={weatherIcon} className="weather-icon" alt="icon" />
          <h1>{Math.round(weatherData.main.temp)}°C</h1>
          <h2>{weatherData.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="wind" />
              <div>
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
