import "./App.scss";
import React, { useRef, useEffect, useState } from "react";
// import ReactMapGL from "react-map-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.985664);
  const [lat, setLat] = useState(40.748424);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);
  // works
  // https://api.mapbox.com/isochrone/v1/mapbox/walking/73.985664,40.748424.json?contours_minutes=10&access_token=pk.eyJ1IjoieHMyMyIsImEiOiJjbGZ4ZmF5MmkwMG16M2V0YXBoaGx1dGN2In0.NgK6FAZDmr2IQK054aKoyA

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
