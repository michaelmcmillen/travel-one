## Table of Contents

- [Introduction](#introduction)
- [Running The Application](#running-the-application)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [PORT Modifications](#port-modifications)
  - [Database Setup](#database-setup)
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

4. Build image and run:
    ```bash
    docker-compose -f docker-compose.yml up --build
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

The application requires a PostGres DB to be setup. Instead of setting this up and populating this locally, you can run the following steps which will build and run a containerised Postgres DB. The scripts will also populate it with the necessary data.

The population of the DB is carried out by:

- Two .js scripts are run to pull down data from an external open API and saves these to .csv files
- When initialising the containerized PostGres DB, a set of SQL statements are run to populate the DB from the .csv files

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

1. Create a .env file similar to the sample one.
2. Make sure the `DB_PORT` variable in your `.env` file is set to 5433.

### Database Setup

1. Execute the following command. This is the initial request for data required for the DB:

    ```bash
    docker-compose -f docker-compose.db.yml run --rm db-data
    ```
1. Once the above has completed, execute the following. This will run the PostGres DB, and populate it with the data from the previous step:

    ```bash
    docker-compose -f docker-compose.db.yml up db
    ```

### Running the App

1. Start the server:

    ```bash
    nodemon start
    ```
2. The server will be running at `http://localhost:3000`.

### Testing the Client

1. Open `http://localhost:3000` in your web browser.
2. You should now be able to use the locally running version of the app, but pointing to the Dockerized PostGres DB.
    
## Project Structure

```bash
travel-one/.
    |-- Dockerfile
    |-- Dockerfile.db
    |-- README.md
    |-- app.js
    |-- bin
    |   `-- www
    |-- config
    |   `-- db.js
    |-- controllers
    |   |-- country.js
    |   |-- currency.js
    |   |-- exchange.js
    |   |-- flight.js
    |   |-- index.js
    |   `-- packing.js
    |-- db_data
    |   |-- country_data.js
    |   |-- currency_data.js
    |   |-- generate_data.sh
    |   `-- init.sql
    |-- docker-compose.db.yml
    |-- docker-compose.yml
    |-- package-lock.json
    |-- package.json
    |-- public
    |   |-- css
    |   |   `-- style.css
    |   |-- currency.html
    |   |-- flight.html
    |   |-- index.html
    |   |-- js
    |   |   |-- flight.js
    |   |   `-- index.js
    |   `-- packing.html
    |-- routes
    |   |-- country.js
    |   |-- currency.js
    |   |-- exchange.js
    |   |-- flight.js
    |   |-- index.js
    |   `-- packing.js
    `-- services
        |-- countryService.js
        |-- currencyService.js
        |-- exchangeService.js
        `-- indexService.js
```