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
