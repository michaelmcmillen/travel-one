## Table of Contents

- [Introduction](#introduction)
- [Running The Application](#running-the-application)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [PORT Modifications](#port-modifications)
  - [Running The App](#running-the-app)
  - [Testing the Client](#testing-the-client)
- [Project Structure](#project-structure)

## Introduction

The travel-one project looks to develop a continuously growing application and an automated pipeline around it. The project is less to do about a feature rich application (however this will come with time), and more around the containerisation, deployment and automated testing around it.

The application provides key information & data i.e. capital, currency, currency symbol etc based on a users search criteria. Country and currency information is stored in a Postgres DB and queried based upon the input country name.

A subsequent country input, allows the user to view the currency conversion i.e. USD 1 = GBR 0.76, based on the original search input, and the second search input. This currency conversion is queried from a request to an external [exchange rate API](https://www.exchangerate-api.com).

## Running The Application

You can run and use the application as it stands by carrying out the below.

1. Clone the repository:
    ```bash
    # Clone using the web URL
    git clone https://github.com/michaelmcmillen/travel-one.git
    ```
    ```bash
    # Use a password-protected SSH key
    git clone git@github.com:michaelmcmillen/travel-one.git
    ```
2. Navigate to the project directory:
    ```bash
    cd di/rec/tory
    ```
3. Create a `.env` file similar to the sample one.
4. Ensure `PORT` is commented out. `PORT` will default to 3000. Using the `PORT` variable is mainly required for development purposes as explained below. 
4. Build image and run:
    ```bash
    docker-compose up --build
    ```
5. Open http://localhost:3000 in your web browser.

## Development Setup

### Prerequisites

#### Dependencies

Depending on how you execute/run this, there a number of packages required. The installation steps below will see these installed through <code>npm install</code>

Installations required locally:

- Node.js
- npm (Node Package Manager)
- PostgreSQL
- Docker

#### Database

The application requires a Postgres DB to be setup. Instead of setting this up and populating this locally, you can run the above steps to build the dockerized application locally. This will create a containerized PostGres DB and populate it with the necessary data.

The population of the DB is carried out by:

- At build time, 2 JS scripts are run to pull down data from an external open API and saves these to .csv files
- When initialising the containerized PostGres DB at compose, a set of SQL statements are run to populate the DB from the .csv files

Use the following Installation steps to then run the app locally, pointing to the Dockerized DB that has been spun up.

### Installation

1. Clone the repository:
    ```bash
    # Clone using the web URL
    git clone https://github.com/michaelmcmillen/travel-one.git
    ```
    ```bash
    # Use a password-protected SSH key
    git clone git@github.com:michaelmcmillen/travel-one.git
    ```
2. Navigate to the project directory:
    ```bash
    cd di/rec/tory
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
### PORT Modifications

1. Make sure the `PORT` variable in your `.env` file is commented in/is in use.
2. Set this `PORT` to something other than `3000` i.e. `3001`. You want to be accessing your locally run application whilst developing, instead of the Dockerized version spun up in the previous steps.
3. Update the `CLIENT_ORIGIN` to match your above `PORT`.

### Running the App

1. Start the server:
    ```bash
    nodemon start
    ```
2. The server will be running at `http://localhost:3001`.

### Testing the Client

1. Open `http://localhost:3001` in your web browser.
2. You should now be able to use the locally running version of the app, but pointing to the Dockerized PostGres DB.
    
## Project Structure

```bash
travel-one/
    |-- Dockerfile
    |-- README.md
    |-- app.js
    |-- bin
    |   `-- www
    |-- config
    |   `-- db.js
    |-- controllers
    |   |-- country.js
    |   |-- currency.js
    |   `-- exchange.js
    |-- db_data
    |   |-- country_data.js
    |   |-- currency_data.js
    |   `-- init.sql
    |-- docker-compose.yml
    |-- package-lock.json
    |-- package.json
    |-- public
    |   |-- css
    |   |-- index.html
    |   `-- js
    |-- routes
        |-- country.js
        |-- currency.js
        |-- exchange.js
        `-- index.js
```
