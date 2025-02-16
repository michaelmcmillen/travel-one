# Stable version of the Node image
FROM node:19-bullseye

# Create and change to the app directory
WORKDIR /travelone

# Copy all the application files to the container
COPY . .

# Create the ./data directory, for shared data between PG DB and Express containers
RUN mkdir -p ./data

# Install dependencies
RUN npm install

# Run js scripts to create country and currency .csv data sets
# This is used to populated the PG DB
RUN node ./db_data/country_data.js
RUN node ./db_data/currency_data.js

# Make port 3000 available outside this container
EXPOSE 3000

# Run app.js on container startup
CMD [ "npm", "start" ]