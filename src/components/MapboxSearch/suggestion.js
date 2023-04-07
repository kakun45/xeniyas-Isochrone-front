// not tested, not sure if works
import { useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function Suggestion() {
  const [search, setSearch] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = "pk.my-mapbox-access-token";
    setSearch(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: "us",
      })
    );
    setSessionToken(new mapboxgl.NavigationControl());
  }, []);

  const handleSearch = async () => {
    if (!search || !sessionToken) return;
    const result = await search.query("New York City", { sessionToken });
    if (result.features.length === 0) return;
    const suggestion = result.features[0];
    setSuggestion(suggestion);
  };

  useEffect(() => {
    handleSearch();
  }, [search, sessionToken]);

  const handleRetrieve = async () => {
    if (!search || !sessionToken || !suggestion) return;
    if (search.options.flyTo && suggestion.center) {
      const { lng, lat } = suggestion.center;
      const zoom = 14;
      search._map.flyTo({ center: [lng, lat], zoom });
    }
    if (search.options.reverseMode && suggestion.place_name) {
      search.setInput(suggestion.place_name);
    }
    if (
      search.options.trackProximity &&
      suggestion.properties &&
      suggestion.properties.maki
    ) {
      search.setProximity({
        longitude: suggestion.center[0],
        latitude: suggestion.center[1],
      });
    }
    if (
      search.options.types &&
      suggestion.properties &&
      suggestion.properties.category
    ) {
      search.setRenderMode(
        search.options.types.includes(suggestion.properties.category)
          ? "list"
          : "map"
      );
    }
    if (search.options.localGeocoder && suggestion.bbox) {
      const { north, east, south, west } = suggestion.bbox;
      search.setBbox([west, south, east, north]);
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.wikidata
    ) {
      search.setProximity({
        id: suggestion.properties.wikidata,
        entityType: "item",
      });
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.short_code
    ) {
      search.setCountry(suggestion.properties.short_code.toUpperCase());
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.address
    ) {
      search.setLanguage(search.options.localGeocoderLanguage || "en");
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.text
    ) {
      search.setInput(suggestion.properties.text);
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.place_name
    ) {
      search.setInput(suggestion.properties.place_name);
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.address
    ) {
      search.setInput(suggestion.properties.address);
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.name
    ) {
      search.setInput(suggestion.properties.name);
    }
    if (
      search.options.localGeocoder &&
      suggestion.properties &&
      suggestion.properties.label
    ) {
      search.setInput(suggestion.properties.label);
    }
    // if (search.options.localGeocoder && suggestion ...unfinished
  };
}

export default Suggestion;
