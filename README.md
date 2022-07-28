# Project Information
Travel app designed to take in a destination as well as your arrival and departure date from that location from which it will make multiple api calls to display information from that destination such as the weather forecast, an image, the days until your trip, trip length and your arrival and departure dates.

Extended project choice: Add end date and display length of trip.

## Table of contents

- [Installation](##installation)
- [Usage] (##usage)
- [Dependancies] (##Dependancies)

## Installation
[(Back to top)](##table-of-contents)
Step 1: run the following in the console
```
npm install --legacy-peer-deps
```
Step 2: .env file
 - Create a .env file based off .env.template and replace the ### with your own api key
Step 3: Pick server
- For production server
```
npm run build-prod
npm run start
```
 - For dev server:
```
npm run build-dev
npm run start
```
 - For live dev server:
```
npm run build-dev-live
```
Step 4: To perform tests with jest
```
npm run test
```

## Usage
[(Back to top)](##table-of-contents)
Input your destination, the date your arrive at your destination as well as the date you depart from your destination, then click submit. A travel card will be generated for you with your information

## Dependancies
[(Back to top)](##table-of-contents)

Dependencies:
    body-parser: 1.20.0,
    cors: 2.8.5,
    dotenv: 16.0.1,
    dotenv-webpack: 8.0.0,
    express: 4.18.1,
    webpack: 5.73.0,
    webpack-cli: 4.10.0

Developer Dependencies:
    @babel/core: 7.18.9,
    @babel/preset-env: 7.18.9,
    babel-loader: 8.2.5,
    clean-webpack-plugin: 4.0.0,
    css-loader: 6.7.1,
    html-webpack-plugin: 5.5.0,
    jest: 28.1.3,
    mini-css-extract-plugin: 2.6.1,
    node-sass: 7.0.1,
    optimize-css-assets-webpack-plugin: 6.0.1,
    sass-loader: 13.0.2,
    style-loader: 3.3.1,
    terser-webpack-plugin: 4.2.3,
    webpack-dev-server: 4.9.3,
    workbox-webpack-plugin: 6.5.3