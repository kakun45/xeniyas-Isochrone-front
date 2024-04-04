// import Geocoder from "react-map-gl-geocoder"; // depricated
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"; // the search might be depricated on it
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import LngLat from "../LngLat/LngLat";
import MyMapboxSearch from "../MapboxSearch/MyMapboxSearch";
import NavBar from "../NavBar/NavBar";
import "./Isochrone.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;
const API_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://xeniyas-isochrone-back.vercel.app"; // for deployment

function Isochrone() {
  const mapContainer = useRef(null);
  const map = useRef(null); // it's a mapRef	Object -> Ref for react-map-gl map component.

  // this is a viewport params:
  const [lng, setLng] = useState(-73.985664);
  const [lat, setLat] = useState(40.748424);
  const [zoom] = useState(11);

  const [geometry, setGeometry] = useState(null);

  const [profile] = useState("walking"); // Set the default routing profile for Phase2
  const [minutes, setMinutes] = useState("5"); // Set the default duration for Phase2
  const [center, setCenter] = useState([lng, lat]);
  const [inputValue, setInputValue] = useState("");
  const [buttonPressed, setButtonPressed] = useState(0);
  const [marker] = useState(
    new mapboxgl.Marker({
      color: "#314ccd",
    })
  );
  const [isLoading, setIsLoading] = useState(false); // spinner

  // Create a LngLat object to use in the marker initialization
  // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
  const lngLat = {
    lon: lng,
    lat: lat,
  };

  // move/fly the map when the center property changes
  useEffect(() => {
    // remove all markers on selection on a selection of a new address:
    marker.remove(); // https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#remove
    if (map.current === null) return;
    // flyTo  a selec tion from a dropdown
    map.current.flyTo({ center: center, zoom: 14 }); // center: [lng, lat]
    // set a new marker on the new center
    marker.setLngLat(center).addTo(map.current);
  }, [center, marker]);

  useEffect(() => {
    if (map.current) return; // initialize map only once on Mount. {current: Map}
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Specify the container, will have a container for a map class
      // added "?optimize=true" for speed, consider taking out if needed
      style: "mapbox://styles/mapbox/streets-v12?optimize=true", // Specify which map predefined style curated to use
      center: [lng, lat], // Specify the starting position
      zoom: zoom, // Specify the starting zoom
      // projection: 'globe' // to see entire globe space view
    });

    // Initialize the marker at the query coordinates
    marker.setLngLat(lngLat).addTo(map.current);
  }, [lat, lng, marker, zoom]);

  // for Phase2: When a user changes the value of profile or duration by clicking a button, change the parameter's value and make the API query again
  // works
  // const handleChange = (event) => {
  //   // if (event.target.name === "profile") {
  //   //   setProfile(event.target.value);
  //   // }
  //   if (event.target.name === "duration") {
  //     setMinutes(event.target.value);
  //   }
  // };

  // Create constants to use in getIso()
  // const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";

  // useEffect(() => {
  //   // Create a function that sets up the Isochrone API query then makes an fetch call
  //   async function getIso() {
  //     const query = await fetch(
  //       `${urlBase}${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
  //       { method: "GET" }
  //     );
  //     const data = await query.json();
  //     // Set the 'iso' source's data to what's returned by the API query
  //     console.log(data);
  //     map.current.getSource("iso")?.setData(data); // ? must be there for no err
  //   }
  //   getIso();
  // }, [lng, lat, minutes, profile]);

  useEffect(() => {
    // console.log("setting geometry to map");
    map.current.getSource("iso")?.setData(geometry);
  }, [geometry]);

  // Since layers in Mapbox GL JS are remote, they are asynchronous. So code that connects to Mapbox GL JS often uses event binding to change the map at the right time. For example:
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      // When the map loads, add the source and layer
      // Always remove the layer first to avoid an error
      if (map.current.getLayer("isolayer")) {
        map.current.removeLayer("isolayer");
      }
      if (map.current.getSource("iso")) {
        map.current.removeSource("iso");
      }
      map.current.addSource("iso", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer(
        {
          id: "isolayer",
          type: "fill",
          // Use "iso" as the data source for this layer
          source: "iso",
          layout: {},
          paint: {
            // The fill color for the layer is set to a light purple
            "fill-color": "#5a3fc0",
            "fill-opacity": 0.3,
          },
        },
        "poi-label"
      );
    });
  }, []);

  //only on a submit from a buttom, use a .trim() to remove spaces, if not clicked or empty, don't send
  // todo: validation: trim any words too, down to numbers, user possible input "minutes,min,Min,h", display info sign if incorrect input: <5 or >60
  useEffect(() => {
    if (buttonPressed === 0) return;
    if (!inputValue.trim()) return;
    const params = { center, inputValue };
    // API backend call goes here
    setIsLoading(true);
    axios
      .post(`${API_URL}/api/v1/destinations/commute-all`, params)
      .then((res) => {
        setGeometry(res.data);
        setIsLoading(false); // Set isLoading to false after successful API call
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set isLoading to false if there's an error
      });
    // can't put inputValue in here without the validation for empty field or spaces!
  }, [buttonPressed]); // DO NOT subscribe to inputValue here! GET only when submitted, not onChange due to 'expensive' .GETs

  const handleGo = (e) => {
    e.preventDefault();
    // validate that it's not empty ''
    if (inputValue) {
      setButtonPressed(Date.now()); // only when clicked and Not empty do I grab an inputValue
    }
  };

  //  for Phase2 todo side +- buttons
  // useEffect(() => {
  //   const Geocoder = new MapboxGeocoder({
  //     accessToken: mapboxgl.accessToken,
  //     mapboxgl: mapboxgl,
  //   });
  //   // // Add the control to the map.
  //   map.current?.addControl(new mapboxgl.NavigationControl());
  // }, []);

  return (
    <div>
      <NavBar />
      <MyMapboxSearch map={map.current} setCenter={setCenter} />
      {/* {map.current ? (
        <MapboxGeocoder
          mapRef={map.current}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={mapboxgl.accessToken}
          position="top-left"
        />
      ) : null} */}
      {/* <SearchBox
        accessToken={``}
      /> */}
      <div className="absolute fl my24 mx24 py24 px24 bg-gray-faint round">
        <form id="params">
          {/* all works, but removing for now for UX  for Phase2
          <h4 className="txt-m txt-bold mb6">A travel mode:</h4>
          <div className="mb12 mr12 toggle-group align-center">
           <label className="toggle-container">
              <input
                name="profile"
                type="radio"
                value="walking"
                checked={profile === "walking"}
                onChange={handleChange}
              />
              <div className="toggle toggle--active-null toggle--null">
                Walking
              </div>
            </label> 
            <label className="toggle-container">
              <input
                checked={profile === "cycling"}
                name="profile"
                type="radio"
                value="cycling"
                onChange={handleChange}
              />
              <div className="toggle toggle--active-null toggle--null">
                Cycling
              </div>
            </label>

            <label className="toggle-container">
              <input
                checked={profile === "driving"}
                name="profile"
                type="radio"
                value="driving"
                onChange={handleChange}
              />
              <div className="toggle toggle--active-null toggle--null">
                Driving
              </div>
            </label> 
          </div>*/}

          <h4 className="txt-m txt-bold mb6">Choose a maximum commute:</h4>
          {/* <div className="mb12 mr12 toggle-group align-center"> 
           <label className="toggle-container">
              <input
                checked={minutes === "10"}
                name="duration"
                type="radio"
                value="10"
                onChange={handleChange}
              />
              <div className={`toggle toggle--active-null toggle--null`}>
                {/*  need a new def for  activeDistanceClass:
                 className={`toggle toggle--active-null ${
                  minutes === 10 ? "activeDistanceClass" : ""
                } toggle--null`}> 
                10 min
              </div>
            </label>

            <label className="toggle-container">
              <input
                checked={minutes === "20"}
                name="duration"
                type="radio"
                value="20"
                onChange={handleChange}
              />
              <div className="toggle toggle--active-null toggle--null">
                20 min
              </div>
            </label>

            <label className="toggle-container">
              <input
                checked={minutes === "30"}
                name="duration"
                type="radio"
                value="30"
                onChange={handleChange}
              />
              <div className="toggle toggle--active-null toggle--null">
                30 min
              </div>
            </label> 
          </div> 
          <h4 className="txt-m txt-bold mb6">Customize:</h4> */}
          <div className="style-input">
            <input
              className="input border-r--0 round-l round"
              placeholder="Daily travel limit (min)"
              name="duration"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // onChange={handleChange} // works, but sends a request on every key stroke, DONT use it
              onClick={() => setInputValue("")}
            />
            <button
              className="btn px24 round-r"
              onClick={handleGo}
              // Disable the button when isLoading is true
              disabled={isLoading}>
              {isLoading ? "Loading..." : "Go"}
            </button>
          </div>
          {/* <div>{isLoading && <div>Loading...</div>}</div> */}
        </form>
      </div>
      {/* <LngLat center={center} setLng={setLng} setLat={setLat} /> */}
      {/* // <!-- Create a container for the map --> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default Isochrone;
