import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN; // Add my Mapbox access token

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.985664);
  const [lat, setLat] = useState(40.748424);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once on Mount
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Specify the container 
      style: "mapbox://styles/mapbox/streets-v12", // Specify which map style to use
      center: [lng, lat], // Specify the starting position
      zoom: zoom, // Specify the starting zoom
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      // display the center coordinates and the zoom level of the map, and then update that display when a user interacts with the map.
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);
 
  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
