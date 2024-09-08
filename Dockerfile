# Stable version of the Node image
FROM node:19-bullseye

# Create and change to the app directory
WORKDIR /travelone-docker

# Copy all the application files to the container
COPY . .

# Install dependencies
RUN npm install

# Make port 3000 available outside this container
EXPOSE 3000

# Run app.js on container startup
CMD [ "npm", "start" ]