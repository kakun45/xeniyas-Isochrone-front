import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN; // Add my Mapbox access token

function LngLat({ center, setLng, setLat }) {
  // const mapContainer = useRef(null);
  const map = useRef(null); // may need to pass in too
  const [lng, lat] = center;

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      // display the center coordinates and the zoom level of the map, and then update that display when a user interacts with the map.
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      // setZoom(map.current.getZoom().toFixed(2));
    });
  }, [setLng, setLat]);

  return (
    <div>
      <div className="sidebar">
        {/*works too: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
        Longitude: {lng} | Latitude: {lat}
      </div>
    </div>
  );
}

export default LngLat;
