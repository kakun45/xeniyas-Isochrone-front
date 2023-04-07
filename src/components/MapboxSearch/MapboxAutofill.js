// not tested, not sure if works
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { AddressAutofill } from "@mapbox/search-js-react";
import React, { useEffect, useState } from "react";
import "./MyMapboxSearch.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function MyMapboxSearch() {
  const search = new MapboxSearch({ accessToken: mapboxgl.accessToken });
  const [value, setValue] = useState("");

  return (
    <div>
      <form>
        <AddressAutofill accessToken={mapboxgl.accessToke}>
          <input
            autoComplete="Search address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </AddressAutofill>
      </form>
    </div>
  );
}

export default MyMapboxSearch;
