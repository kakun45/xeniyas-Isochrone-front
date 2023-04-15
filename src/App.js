import React from "react";
import "./App.scss";
// import Map from "./components/Map/Map"; // works
import Isochrone from "./components/Isochrone/Isochrone";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import StaticPage from "./components/StaticPage/HTMLPage";

// hold ctr key to rotate a map

function App() {
  // <!-- Create a container for the map -->
  // return <Map />; // works

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Isochrone />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
