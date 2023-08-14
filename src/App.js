import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCards from "./components/WeatherCards";

function App() {
  return (
    <div className="container sized-container">
      <Nav />
      <main>
        <div className="main-container">
          <WeatherSearch />
          <WeatherCards />
        </div>
      </main>
    </div>
  );
}

export default App;
