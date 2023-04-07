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
        {/* buttons don't work */}
        <Route path="/map" element={<Isochrone />} />;
        {/* static page doesn't load */}
        {/* <Route path="/map2" element={<StaticPage />} />; */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
