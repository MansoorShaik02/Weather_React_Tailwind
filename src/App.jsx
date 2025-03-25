import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Forecast from "./pages/Forecast";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CurrentWeather />} />
          <Route path="/weather-forecast" exact element={<Forecast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
