-- Postgres DB initialisation scripts
-- DB tables created
-- Python scripts executed to retrieve data and store in .csv file
-- DB tables populated with .csv data

-- Create 'country' table
CREATE TABLE country (
  id SERIAL,
  country VARCHAR(100),
  continent VARCHAR(100),
  currency VARCHAR(100),
  population INT,
  capital VARCHAR(100),
  iso2 VARCHAR(5),
  iso3 VARCHAR(5),
  flag VARCHAR,
  PRIMARY KEY (id)
);

-- Create 'currency' table
CREATE TABLE currency (
  id SERIAL,
  currency VARCHAR(100),
  symbol VARCHAR(20),
  code VARCHAR(20),
  PRIMARY KEY (id)
);

-- Copy data from country_data.csv file into 'country' table
-- country_data.csv should be created from the execution of country_data.js and
-- saved in the shared /travelone/data/ volume
COPY country(
    country, 
    continent, 
    currency, 
    population, 
    capital, 
    iso2, 
    iso3, 
    flag)
FROM '/travelone/data/country_data.csv' 
DELIMITER ','
CSV HEADER;

-- Copy data from currency_data.csv file into 'currency' table
-- currency_data.csv should be created from the execution of currency_data.js and
-- saved in the shared /travelone/data/ volume
COPY currency(
    currency, 
    symbol, 
    code)
FROM '/travelone/data/currency_data.csv' 
DELIMITER ','
CSV HEADER;