import React, { useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./MyMapboxSearch.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function MyMapboxSearch({ map, setCenter }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  // dropdown
  const [showStyleListState, setShowStyleListState] = useState(true);
  // to clear the input when clicked but restore the selected address if nothing is typed. Solution: Use a Temporary State for Clearing. isInputCleared state to track whether the user has clicked into the input.
  const [isInputCleared, setIsInputCleared] = useState(false);

  useEffect(() => {
    if (!query.trim()) return; // Prevents fetching with an empty query which allowed to happen onClick
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?language=en&limit=3&country=US&access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setResults(data.features || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, [query]);

  // todo: v2 - setLatLng in boundary of NYC only: for loop and don't display other lngLat:
  // - import file nycBoundaries.json, (it's in /data in server side)
  // - check if the suddestion is within,
  // - show it into a dropdown
  // or look into how to send requests with the bounderies attached
  const handleClick = (e, index) => {
    if (!results[index] || !results[index].center) {
      console.error("Invalid result selected:", results[index]);
      return;
    }
    const selectedAddress = results[index].place_name; //get the full address text
    setCenter(results[index].center); // move the map center
    setIsNewLocation(true); // Mark as new location
    setQuery(selectedAddress); // update input field with the selected address
    setIsInputCleared(false); // Restore input when a new address is selected
    setShowStyleListState(false); // hide the dropdown
  };

  return (
    <div>
      <form>
        <div className="relative">
          <div className="absolute flex flex--center-cross flex--center-main w36 h36">
            <svg className="icon">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </div>
          <input
            onClick={() => {
              // e.target.value = ""; // Don't use. need to click 2ce to clear
              setQuery(""); // clear the input field for ease on mobile - too much backspase
              setIsInputCleared(true); // mark input as cleared
              setShowStyleListState(true); // Show dropdown
            }}
            className="input pl36"
            type="text"
            value={isInputCleared ? "" : query} // Show empty if cleared, otherwise show query
            placeholder={"Search location"}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsInputCleared(false); // User is typing, don't restore address
            }}
          />
        </div>
      </form>

      {showStyleListState && (
        <div className="style-list">
          {results.map((result, index) => (
            <div key={result.id} className="style-entry">
              <div onClick={(e) => handleClick(e, index)}>
                <p>&#128640; {result.place_name}</p>
                <hr />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMapboxSearch;
