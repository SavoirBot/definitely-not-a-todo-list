# Definitely not a TODO list

> ✨ Bootstrapped with Create Snowpack App (CSA).

This repository contains the code for a TOREAD list, which is not the same as a TODO list, built using React,
CouchDB, and PouchDB for an offline first experience. The application will keep working, whether you're online or
offline, and notify the user when the database is offline.

This application is featured in a blog post on our blog.

## How to use

To run this application, you will need a valid installation of [Docker](https://docs.docker.com/get-docker/) and 
[Node.js](https://nodejs.org/en/). We recommend using the latest LTS version of Node.js and the latest version of 
Docker.

First, install all the dependencies with `npm install`, then start the docker container for CouchDB using `docker 
compose up -d`. 

Typing `npm run start` will start the application under http://localhost:8080, open it in your browser to view the 
application. Feel free to add new to-read items and to explore the features of the app.

To test the offline capabilities of the app, stop the containers with `docker compose stop couchserver`. A warning 
will appear in the app, letting you know the database is offline. You can still work in the app while it's off. To 
start the app again, type `docker compose start couchserver`, the app will automatically detect the server is now 
back online and will sync the data.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
