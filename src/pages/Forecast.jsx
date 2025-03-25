import { useState, useRef } from "react";

const Api_key = import.meta.env.VITE_SECRET_KEY;

const WeatherTypes = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];

const Forecast = () => {
  const inputRef = useRef(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchWeeklyForecast = async () => {
    try {
      setLoading(true);
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current.value}&limit=1&appid=${Api_key}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        alert("City not found!");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Api_key}`
      );
      const weatherData = await weatherRes.json();

      setForecastData(weatherData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white px-4">
      <div className="bg-red-500 max-w-sm w-full p-6 rounded-md shadow-md">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-lg border-b rounded-full p-2 border-gray-200 font-mono flex-1 text-red-500 outline-none"
          />
          <button onClick={fetchWeeklyForecast} className="p-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="Search"
              className="w-8"
            />
          </button>
        </div>

        {/* Temperature Toggle Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleTemperature}
            className="bg-white text-red-500 px-4 py-2 rounded-md font-bold"
          >
            {isCelsius ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>

        {/* Forecast Display */}
        <div className="mt-4">
          {loading ? (
            <div className="text-center mt-4">
              <p>Loading...</p>
            </div>
          ) : (
            forecastData &&
            forecastData.list
              .filter((_, index) => index % 8 === 0)
              .map((day, index) => {
                const weatherType = day.weather[0].main;
                const weatherIcon = WeatherTypes.find(
                  (w) => w.type === weatherType
                )?.img;
                const tempCelsius = day.main.temp;
                const tempFahrenheit = (tempCelsius * 9) / 5 + 32;

                return (
                  <div
                    key={index}
                    className="p-3 border rounded-lg bg-white text-black my-2 flex items-center justify-between"
                  >
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-md sm:text-lg font-bold">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-lg">{weatherType}</p>
                      <p className="text-md sm:text-lg">
                        {isCelsius
                          ? tempCelsius.toFixed(1)
                          : tempFahrenheit.toFixed(1)}
                        °{isCelsius ? "C" : "F"}
                      </p>
                    </div>
                    {weatherIcon && (
                      <img
                        src={weatherIcon}
                        alt={weatherType}
                        className="w-10 h-10 sm:w-12 sm:h-12"
                      />
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
