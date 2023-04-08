// not tested, not sure if works. might be for shipping, not got lat/lng
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { AddressAutofill } from "@mapbox/search-js-react";
import React, { useEffect, useState } from "react";
import "./MyMapboxSearch.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function MyMapboxSearch() {
  const search = new MapboxSearch({ accessToken: mapboxgl.accessToken });
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setResults(data.features));
  // }, [query]);

  return (
    <div>
      <form>
        <AddressAutofill accessToken={mapboxgl.accessToke}>
          <input
            autoComplete="shipping address-line1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </AddressAutofill>
      </form>
    </div>
  );
}

export default MyMapboxSearch;
