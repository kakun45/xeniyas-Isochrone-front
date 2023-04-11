# Commute Crafter by Xeniya Shoiko

Mapping the Best NYC Living Spaces Within Your Commute Time.

[My linkedin](https://www.linkedin.com/in/xeniya-shoiko)

(screenshot?)

## Product Description

Commute Crafter is a nifty tool that visualizes all destinations reachable within a specific time frame in New York City, whether it's by foot or subway. It's perfect for selecting an apartment or job based on its location while still keeping your commuting time in mind.

## Features and Usage Instructions

TODO fill out (e.g. you enter your address, and # of minutes to commute and press go and it shows all the areas you can reach in that time)

## How to install my project in a development environment

- how to get to use in VS Code: open VS Code and navigate to a directory by

```
File -> Open Folder
```

- now to install mysql

```
npm i mysql2
```

- how to run server

```
npm run dev # or npx nodemon index
```

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
```

The "migrate" script in a package.json file is a command that uses the Knex.js library to run database migrations. Migrations are a way to manage changes to your database schema over time, allowing you to version your database schema and apply changes in a controlled and repeatable way. All scripts are defined in my `package.json` file, you can easily run common commands and tasks for your Node.js application using the npm run command:

```
 npm run migrate # knex migrate:latest
 npm run migrate:down # knex migrate:down
 npm run migrate:rollback # knex migrate:rollback
 npm run seed # knex seed:run
```

Seed files are used to populate your database with initial data, such as default settings, test data, or user accounts allowing you to quickly set up test data or default settings. To tell the Knex.js library to run database defined in my project seed files:

```
npm run seed # knex seed:run
```

## developer installation instructions

<back>

1. Get a MapBox API public key at [mapbox](https://account.mapbox.com/)

1. Set up an `.env` inside the project root file with a `ACCESS_TOKEN` environment variable for both Front and Backend `.env` files

1. Navigate to the directory where my React app is located. Install the dependencies listed in my existing `package.json` file for a React app, you can use the `npm install` command.

1. Create and select a database in mysql2 with a name `capstone`

```
CREATE DATABASE capstone;
USE capstone;
```

5. Save your database user and password into the `.env` of a server side wich will be used in a database configuration file `knexfile.js`

## To instal React you have to clone this [frontend repo](https://github.com/kakun45/xeniyas-Isochrone-front)

```
npm start  # to start react
```

To run in a browser:

```
http://localhost:3000/map
```

Unexpected result? Hard reload:

```
cmd + shift + R
```

The address field takes in a user's input as a typed in text and produses suggestions,
the calculations will wait for a second piece of input to begin: `max commute time` and a press of a `Go` button

## To install the server side clone a [backend repo](https://github.com/kakun45/xeniyas-Isochrone-back)

```
npm run dev # starts the Express server and watches with nodemon
```

<front>

## Tech Stack and (Project Requirements)

(it must have HTML and CSS implemented using React -> is uses HTML/CSS and React)

(My application uses dynamic data -> it uses both a database for Subway data, and the MapBox API)

(We expect you to incorporate a server into your application -> it uses an express server I wrote and the MapBox API)

- React.js (HTML/CSS/SCSS)
- Mapbox API
- Express/Node with Axios and Knex libraries
- mySQL
- data processing and clean up: Python, Pandas, Google Colaboratory: [link](https://colab.research.google.com/drive/1B1fAf8jqy54z5zkoOT7kwNqiI2hcJ7eo?usp=share_link)
- Public data [???]

## Express API Reference

(remove if you dont fill this this)

(APIs for instructors to look at go here)
endpoints for frontend calls:

```
http://localhost:8080/api/v1/destinations/commute-all
```

This takes a coordinate and returns setGeometry Promise<...>

- lat is the latitude of ...

## Lessons learned

- how to use React properly - once I start to separeate properly handlers from the code tat reacts to states changes
- (dijkstra)
- (more difficult than expected)
- calculating the dispance between two points is complicated. the Earth is not flat
- the version of shortest path algoritm is not efficient, but still worked really well (baseline for dijkstra: O(|E| log |V|), which I didn't come close)
- using custom classes in JavaScript

## Next steps

- account for time spent waiting for trains
- show accessibility and amenities (hospitals)
- color code based on types of transport used
- support cycling busses and ferries
- toggle express trains on and off
- sidewalks and intersections would go in there too
- add caching for mapbox api responses
- deploying the project to production
- implementig functionality for placeholders for OAuth
- pick an open source license
- to expand to calculate any region
