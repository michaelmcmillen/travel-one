const path = require('path');

// Function to fetch the absolute path of the index page
const fetchIndex = async () => {
    return path.join(__dirname, '../public/index.html'); // Get the absolute path to the 'index.html' file
};

module.exports = { 
    fetchIndex
};