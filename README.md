## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Testing the Client](#testing-the-client)
- [Project Structure](#project-structure)

## Introduction

The travel-one project looks to develop a continuously growing application and the CI/CD pipeline around it. The project is less to do about a feature rich application (however this will come with time), and more around the containerisation, deployment and automated testing around it.

As of September 2024, the application provides key information & data i.e. capital, currency, currency symbol etc based on a users search criteria. Country information is stored in a Postgres DB and queried based upon the input country name.

A following country input, allows the user to view the currency conversion i.e. USD 1 = GBR 0.76, based on the original search input, and the second search input. This currency conversion is queried from a request to an external [exchange rate API](https://www.exchangerate-api.com).

## Setup

### Prerequisites

Depending on how you execute/run this, the below packages are required. The installation steps below will see these installed through <code>npm install</code>

- express
- knex
- pg
- cookie-parser
- debug
- nodemon

Installation required locally:

- Node.js
- npm (Node Package Manager)
- PostgreSQL
- Docker

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

## Usage

### Running the Server

1. Start the server:
    ```bash
    nodemon start
    ```
2. The server will be running at `http://localhost:3000`.

### Testing the Client

1. Open `http://localhost:3000` in your web browser.

## Project Structure

```bash
travel-one/
  |-- README.md
  |-- app.js
  |-- data
  |   |-- countries_data.csv
  |   |-- currencies.csv
  |-- package-lock.json
  |-- package.json
  |-- public
  |   |-- index.html
  |   |-- javascripts
  |   |   |-- index.js
  |   |-- stylesheets
  |       |-- style.css
  |-- routes
  |   |-- country.js
  |   |-- currency.js
  |   |-- exchange.js
  |   |-- index.js
  |   |-- users.js
  |-- scripts
      |-- country-csv.py
      |-- currency-csv.py
  |-- Dockerfile
```
