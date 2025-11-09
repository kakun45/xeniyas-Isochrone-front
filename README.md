# Commute Crafter by Xeniya Shoiko (frontend)

Mapping the Best NYC Living Spaces Within Your Commute Time. [My linkedin](https://www.linkedin.com/in/xeniya-shoiko)

https://user-images.githubusercontent.com/53381916/231323083-53847dfd-702c-40b2-9530-1c905b1c58a3.mov

---

And now it's [deployed](https://xeniyas-isochrone-front.vercel.app/)

---

## Product Description

Commute Crafter is a nifty tool that visualizes all destinations reachable within a specific time frame in New York City, whether it's by foot or subway. It's perfect for selecting an apartment or job based on its location while still keeping your commuting time in mind.

<img width="1280" alt="map over Manhattan, NY" src="https://user-images.githubusercontent.com/53381916/231276125-ae09f6cb-90e2-49bf-9579-ca5d190056f0.png">

## Features and Usage Instructions

This application is designed to provide users with geo visualization instructions. For instance, by inputting your NYC `address` and desired `commute time` min 6 min and up to an hour, and a click the `"Go"` button the application will display all the areas in NYC you can reach within that specified time frame.

## What is an Isochrone ("iso") Layer?

An **isochrone map** shows areas that can be reached from a point within a certain time (e.g., walking 6 minutes, train 30 minutes).

Mapbox GL provides an Isochrone API to generate these areas dynamically.

**Important Note:** The API does not support commute times exceeding 60 minutes. I set a minimum walking time of 6 minutes from the starting point, as subway entrances are rarely farther than that.

<img width="710" alt="drop down with addresses" src="https://user-images.githubusercontent.com/53381916/231276319-a66e442a-3a34-4201-97b2-1fd5bd2772a4.png">

<img width="1280" alt="isochrones displayed" src="https://user-images.githubusercontent.com/53381916/231276411-4f9e8c8a-25c2-4c2b-aace-6c807cfef05c.png">
Whether you are a seasoned commuter or a first-time user, this application can help you save time and make more informed decisions about your daily commute or travel plans.

# Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- MySQL

```
npm i mysql2 # to install MySQL
mysql -u <username> -p # Open MySQL in your terminal or command prompt
```

# Development Environment Setup Guide (Locally)

- To install my app you have to clone this frontend repo
- To install the server-side clone a [backend repo](https://github.com/kakun45/xeniyas-Isochrone-back)

- how to get to use in VS Code: open VS Code and navigate to a directory by drag-and-drop or:

```
File -> open cloned_repo_folder
```

1. Get a MapBox API public key at [Mapbox](https://account.mapbox.com/)

- Create a new file in the root of the project called `.env`. inside the project root file with an key environment variables for both Front and Backend `.env` files

- Front End `.env.sample`:

```
REACT_APP_SERVER_URL = http://localhost:8080
REACT_APP_MAPBOX_PUBLIC_TOKEN = <your public key>
```

- Back End `.env.sample`:

```
PORT = 8080
ACCESS_TOKEN = <your public key>
DB_USER = <database username>
DB_PASSWORD = <database password>
DB_NAME = <database>
...
# for a current list see the backend repo
```

- `json` Files required to run from a `/data` directory on the backend:

```
./data/sceleton_res.json # for layering Geometries in the future API calls
./data/nodes_nodup.json # to populate Nodes db table
./data/edges_nodup_rounded.json # to populate Edges db table

```

Once you have created these folders and files, you will have the following file structure:

```
├── server
|── index.js
||── controllers
│|── data
││├── sceleton_res.json
││├── nodes_nodup.json
││├── edges_nodup_rounded.json
|||── ...
||── migrations
||── seeds
||── routs
...
```

The "migrate" script in a package.json file is a command that uses the Knex.js library to run database migrations. Migrations are a way to manage changes to your database schema over time, allowing you to version your database schema and apply changes in a controlled and repeatable way. All scripts are defined in my `package.json` file, you can easily run common commands and tasks for your Node.js application using the npm run command:

```
 npm run migrate # knex migrate:latest
 npm run migrate:down # knex migrate:down
 npm run migrate:rollback # knex migrate:rollback
 npm run seed # knex seed:run
```

Seed files are used to populate your database with initial data, such as default settings, test data, or user accounts allowing you to quickly set up test data or default settings. To tell the Knex.js library to run the database defined in my project seed files:

```
npm run seed # knex seed:run
```

- The seeding Data is originally from [Open source](https://new.mta.info/developers), I cleaned it up with Python, please email to chat about my cleane-up approach. [link to my duplicates reduction flow](https://colab.research.google.com/drive/1B1fAf8jqy54z5zkoOT7kwNqiI2hcJ7eo?usp=share_link) here is one of the final runs, showing how to remove duplicates

2. Navigate to the directory where my app is located. Install the dependencies listed in my existing `package.json` files for the app, you can use this command for both front- and backend:

```
npm install
```

3. Access, Create and select a database in mysql2

```
mysql -u your_username -p # on Command line
CREATE DATABASE <name_of_db>;
USE <name_of_db>;
exit
```

4. Add your database `username` and `password` into the `.env` of a server-side wich will be imported in a database configuration file `knexfile.js`

- how to run the backend Express

```
npm run dev
# or to start the Express server and watch it with nodemon
npx nodemon index.js
```

- how to run the frontend React

```
# to start React
npm start  
```

5. To see the server in action open your web browser and go to port 3000:

```
http://localhost:3000
```

- - Unexpected result in a browser? Try hard reload:

```
cmd + shift + R
```

- - "Third-Party cookie..." or `ERR_BLOCKED_BY_CLIENT`

Disable ads blocker uBlockO (Mapbox API suggests)

## Express API Reference

POST to Endpoint from the frontend with params of `center` and `inputValue`:

```
<host>/api/v1/destinations/commute-all
```

This takes a coordinate and returns `setGeometry` Promise<...> in a form:

```
{
  features: [ { properties: [Object], geometry: [Object], type: 'Feature' } ],
  type: 'FeatureCollection'
}
```

To extract `latitude` and `longitude` of selected address by a user

---

## Tech Stack

My application leverages dynamic data through the integration of a Subway data, database and the MapBox API, which both utilized within an Express server that I developed. This architecture provides users with real-time access to Subway system and location-based services through a reliable and scalable backend infrastructure.

- React.js (JavaScript, JSX, HTML, SCSS)
- Mapbox API
- Express/Node with Axios and Knex libraries
- MySQL
- Data processing and clean up:
- - Python, Pandas, Google Colaboratory: [link to my duplicates reduction flow](https://colab.research.google.com/drive/1B1fAf8jqy54z5zkoOT7kwNqiI2hcJ7eo?usp=share_link)
- - Public data [link](https://new.mta.info/developers)
- Deployment: Vercel, PlanetScale (and other free db over time)

---

Medium tech-blog post for this repo methodology. 

# Methodology: 
This React SPA web app project implements an isochrone mapping application with a JavaScript backend and a JavaScript/SCSS/HTML frontend.

- Purpose: generate and display isochrones (areas reachable within a given time/distance) for user-specified origin and MTA transport mode. NYC only.
- Architecture: single-page frontend (React.JS + SCSS + HTML) that calls a JS backend API. Backend performs routing/isochrone computation or proxies requests to a routing engine/service and calls MapboxAPI and returns standard geo-data (GeoJSON).
- Data flow: user inputs origin address, time → frontend sends request to backend → backend computes or requests isochrone polygons from Mapbox → backend performs graph seearch with Dijkstra algo,  transforms and returns GeoJSON → frontend renders polygons on an interactive map and updates UI.
- Key components: input validation and UI state (frontend), API endpoints and isochrone generation logic (backend), map rendering and styling (GeoJSON, vector tiles, or map library integration), database MTA routs and schedule stored.
- Nonfunctional concerns (TODOs): caching repeated queries, rate-limiting external routing services, performance tuning for polygon generation and rendering, and responsive UI styling with SCSS, instructions on landing page to improve comprehensiveness, UX with `Enter` key stroke.
- Development process (7 day sprint): iterative feature-driven sprint, unit/integration tests for backend endpoints, manual and automated UI checks, and CI/CD on Vercel and cloud database to deploy backend and dynamic frontend builds.

## Implementation details (endpoints, data formats, deployment)
### Data formats and conventions
- All spatial payloads use GeoJSON (Feature or FeatureCollection).
- Coordinate order: [lng, lat] (GeoJSON standard).
- Properties on features: range (numeric), units (string), mode (string), generatedAt (ISO timestamp).
- `.env.sample` 
  
### Backend implementation details
- Tech: react SPA, Node.js, Express, JavaScript.
- Routing/isochrone engine:
  - proxy to external APIs (routing, Mapbox Isochrone, with API keys).
- Polygon generation & processing:
  - Used routing outputs (isochrone contours, travel-time graph with Dijkstra) converted to GeoJSON polygons.
  - for simplification: union/difference to produce one unified isocron not layered "birthdday cake" of small isocrones on top of each other) and area filtering to NYC only provided by database.
- Rate-limiting & throttling:
  -  enforced by 3rd party API: express-rate-limit or built-in provider limits; per-IP and per-API-key quotas.
- Testing:
  - Unit tests with Playwright for endpoint logic, scheduled database health checks (Prefect),  
- Observability (ideas):
  - Structured logs, request tracing, metrics (Prometheus), error tracking (Sentry).
- Caching (todo ideas):
  - implement: GET /api/cache/status (admin) and POST /api/cache/clear (admin).
  - response caching keyed by origin+mode+ranges+parameters; store GeoJSON and TTL. 
  - Purpose: inspect/clear server cache (protected with auth).
- endpoints "back-end"
  - `getIso` (station)
    - Calls MapboxAPI with `station.lon`, `station.lat` and `station.walk_minutes`
    - Returns a GeoJSON geometry (Polygon)
    - Requires process.env.ACCESS_TOKEN
    - getAllGeometry(stations)
  - Calls `getIso` for each mta-station in parallel (Promise.all)
Returns a GeoJSON FeatureCollection whose `geometry` is a GeometryCollection of polygons.
- Origin stations assembly: applied a distance formula to identify stations within an N-minute walking distance. 
- For testing (note for my future-self):
    - GET /api/v1/destinations/
  Simple health check - returns "OK" (text).
    - GET /api/v1/destinations/2
  Returns sample isochrone JSON from data/lexington_geometries.json (JSON).
    - GET /api/v1/destinations/collection
  Returns sample GeometryCollection JSON from data/geometry_collection.json (JSON).
    - GET /api/v1/destinations/test-one
  Calls Mapbox isochrone for one hardcoded station and returns a single geometry (GeoJSON geometry object / Polygon).
    - GET /api/v1/destinations/test-all
  Calls Mapbox isochrone for several hardcoded stations, assembles a FeatureCollection with a GeometryCollection of polygons, and returns it (GeoJSON FeatureCollection).
    - POST /api/v1/destinations/commute-one
  Input: { center: [lng, lat], inputValue: minutes }
  Calls Mapbox isochrone for that single origin and returns the geometry (GeoJSON geometry object / Polygon).
    - POST /api/v1/destinations/commute-all
  Input: { center: [lng, lat], inputValue: minutes }
  Finds nearby stations (originToArrOfStations), requests isochrones for each, merges polygons with Turf.js (union), and returns the combined polygon (GeoJSON Feature or FeatureCollection if <2 features).
    - GET /api/v1/destinations/points
  Uses a hardcoded center (Empire) and walkMinutes to fetch station rows (originToArrOfStations) and returns the station data (JSON array).


### Frontend implementation details
- Tech: single-page app in react, JS, SCSS, HTML; integrate map library (Mapbox GL JS).
- Map rendering:
  - Accept GeoJSON, add as vector layers with color ramp (e.g., areas time tightened by MTA + walking speed of average human  with decreasing opacity).
  - Renders popup info for user guidenece,
- isocrone produced on a single button design click showing range within provided travel time. (min 6 min - max 60 min)
- UI:
  - Controls for origin (type in the address, 3 best matches offered, select, geolocate point of origin moved with fly-in animation, mode selection, numeric input), Go one-button interface.
  - Client-side validation.
- Data flow:
  - POST to /api/isochrone, parse FeatureCollection, draw layers.
  - (todo) Implement cache-aware UI: show cached indicator if backend returns cache metadata.
  - (idea) debounce of requests (e.g., 300ms).
- endpoints "front-end":
  - GET `{API_URL}/api/check-db`
    - What it does: health/readiness check for the backend / database used by the app.
    - Where used: called on component mount (useEffect) to set dbStatus and isDbCheckInProgress.
    - Behavior: expects JSON (e.g., { message: "..."}). If response.ok → UI shows success; otherwise UI shows error and disables the “Go” button.
  - POST `{API_URL}/api/v1/destinations/commute-all`
    - What it does: core request to generate commute/isochrone data for the map.
    - Where used: fired when the user clicks “Go” (handleGo triggers buttonPressed effect).
    - Request body (JSON): { center: [lng, lat], inputValue: "<minutes>" } — inputValue is an integer-string (validated client-side: min 6, max 60).
    - Expected response: GeoJSON-like geometry (FeatureCollection of polygons). The code does setGeometry(res.data) and updates the Mapbox source "iso" with that data.
    - Behavior: toggles isLoading while fetching; errors are logged and stop the loading spinner.

### Security and operational
- CORS: restrict allowed origins for production.
- Authentication: API keys or token-based auth for protected endpoints.
- Secrets: routing API keys, DB credentials in environment variables.
- TLS: serve backend over HTTPS.
- Rate-limit and abuse protection.

### Deployment steps
- Prereqs: Node.js, React.
- Local dev:
  - Clone repos (front and back).
  - Backend: `cd backend && npm install && npm run dev # (or npm start after build).`
  - Frontend: `cd frontend && npm install && npm start`
- Docker (idea):
  - Backend Dockerfile: FROM node:18, copy package.json, install, build, expose PORT, CMD ["node","dist/index.js"].
  - Frontend: build static assets and serve via nginx or serve from backend via express static middleware.
  - docker-compose.yml: services: backend, redis, (optional) routing-engine service.
  - Example: `docker-compose up -d --build`
- Deploying to cloud:
    - V0: Deploy backend container to Vercel + PlanetScale for Vercel.
    - V2: Vercel + tech.db,
    - V3: Vercel + avian. (I'm sure I'm not going to stop there.)
    - environment variables: DB_PORT, DB_URL, DB_Host, db_user, access_token to mapbox_api
  - Frontend static: deploy to Vercel. (idea: bundle into backend and serve from same domain to avoid CORS.)
  - CI/CD (GitHub Actions):
    -  environments: `dev`, `prod`.

Example curl (quick)
- Request:
  `curl -X POST https://api.example.com/api/isochrone -H "Content-Type: application/json" -d '{"origin":{"lat":35.6895,"lng":139.6917},"mode":"driving","ranges":[300,600],"units":"seconds"}'`
- Response: `GeoJSON FeatureCollection` as shown above.


---

## Lessons learned

- Clean public data! (80M -> N Kb)
- Proper usage of React involves separating event handlers from the logic that handles state changes. This helps to keep the codebase organized, maintainable, and easy to debug. By separating these concerns, we as developers can focus on writing code that is both efficient and easy to maintain over time;
- The project turned out to be more difficult than expected, wait for my  postmortem on the project;
- Calculating the distance between two points is complicated. The Earth is not flat, using Cos, Sin, Pi, and Degrees can be intimidating, and checking my math with extra pair of human eyes and calculators all over the internet was a necessity;
- Dijkstra - my version of the shortest path algorithm is not efficient, but still worked really well. Entire process runs instantly locally. Using a less efficient version of the shortest path algorithm may still produce satisfactory results for small inputs or with large computational resources. However, even small differences in efficiency can have a significant impact on the overall performance of the system, especially for large inputs or limited resources. Therefore, it's generally better to use the most efficient algorithm available to ensure better performance of the system. (baseline for Dijkstra: O(|E| log |V|));
- Whether you're using `async/await` or `.then()`, it's important to write your code in a way that doesn't accidentally create multiple execution contexts on the server side. This can be achieved by properly managing your async functions, avoiding infinite loops, and avoiding blocking the event loop;
- DO NOT subscribe for userInput state when making an API call!
- Deploying my React frontend, the database, and server across multiple parties proved to be an enjoyable challenge. Throughout the process, I had to make several modifications modifications to the successfully running locally project, including setting up multiple environments, implementing SSL, seeding the remote database, and tweaking the path for the deployment version using `cwd` in order to maintain a consistent workflow for both development and production environments. You can find the link to the deployed project at the top.
- suddenly my data files were not accessible to the deployment environment due to a path change in production, the solution was a `process.cwd()` - which returns a string that represents the current working directory. This can be useful when you need to access files or directories relative to the current working directory.

## Next steps

- account for time spent for transfer the trains
- toggle express trains on and off
- search within polygons to show accessibility and amenities (POI, ER, hospitals, groceries, schools)
- colorcode based on types of: transport used, time, reach, etc.
- support cycling, busses, ferry, LIRR, Metro North. etc.
- sidewalks and intersections would go in there too for transfers
- caching for Mapbox API responses for a slider
- implementing functionality for placeholders for OAuth
- find other public transport date to expand and calculate any region, not just NYC
- add trains tracking live.
