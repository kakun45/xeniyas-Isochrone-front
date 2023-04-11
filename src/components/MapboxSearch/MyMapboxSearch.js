import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useState } from "react";
import "./MyMapboxSearch.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function MyMapboxSearch({ map, setCenter }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showStyleListState, setShowStyleListState] = useState(true);

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?language=en&limit=3&country=US&access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.features);
      });
  }, [query]);

  const handleClick = (e, index) => {
    // todo: setLatLng in boundary of NYC only: for loop and don't display other lngLat:
    // - import file nycBoundaries.json, (it's in /data in server side)
    // - check if the suddestion is within,
    // - show it into a dropdown
    // or look into how to send requests with the bounderies attached
    console.log(results, index, results[index], results[index].center, map);
    setCenter(results[index].center); // [-84.383662, 33.781374]
  };

  return (
    <div>
      <form>
        {/* <div className="prose"> */}
        <div className="relative">
          <div className="absolute flex flex--center-cross flex--center-main w36 h36">
            <svg className="icon">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </div>
          <input
            onClick={(e) => {
              // clear the input field
              // e.target.value = ""; // Don't use. need to click 2ce to clear
              setQuery("");
              setShowStyleListState(true);
            }}
            className="input pl36"
            type="text"
            value={query}
            placeholder={"Search location"}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </form>

      {showStyleListState ? (
        <div className="style-list">
          {results.map((result, index) => (
            <div key={result.id} className="style-entry">
              <div
                onClick={(e) => {
                  handleClick(e, index);
                  setShowStyleListState(false);
                  e.target.value = "";
                }}>
                <h3>{result.text}</h3>
                <p>{result.place_name}</p>
                <hr />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MyMapboxSearch;
