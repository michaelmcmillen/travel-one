#!/bin/bash

# These scripts generate the .csv data
# to populate the DB
node ./db_data/country_data.js
node ./db_data/currency_data.js
