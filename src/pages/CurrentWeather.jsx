// export default App;
import { useRef, useState } from "react";

const Api_key = import.meta.env.VITE_SECRET_KEY;

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

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

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod === "404" || data.cod === "400") {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        } else {
          setShowWeather(
            WeatherTypes.filter(
              (weather) => weather.type === data.weather[0].main
            )
          );
          setApiData(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center justify-start p-0 ">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-lg shadow-lg mt-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="w-full p-2 border-b border-gray-300 focus:outline-none text-lg sm:text-xl md:p-3 md:text-2xl"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="Search"
              className="w-8 sm:w-10"
            />
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            showWeather ? "h-auto mt-6" : "h-0"
          }`}
        >
          {loading ? (
            <div className="flex justify-center mt-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="Loading"
                className="w-14 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col items-center gap-6 mt-4">
                {apiData && (
                  <p className="text-lg sm:text-xl font-semibold">{`${apiData.name}, ${apiData.sys.country}`}</p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="Weather Icon"
                  className="w-28 sm:w-32 md:w-40"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {showWeather[0]?.type}
                </h3>
                {apiData && (
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                      alt="Temperature"
                      className="h-8 sm:h-10"
                    />
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                      {isCelsius
                        ? `${apiData.main.temp}°C`
                        : `${(apiData.main.temp * 9) / 5 + 32}°F`}
                    </h2>
                  </div>
                )}
                <button
                  onClick={toggleTemperature}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {isCelsius ? "Switch to °F" : "Switch to °C"}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
