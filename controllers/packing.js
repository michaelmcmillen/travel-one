const path = require('path');

// Get the packing page
const getPackingPage = async (req, res) => {
  const filePath = path.join(__dirname, '../public/packing.html'); // Get the absolute path to the 'packing.html' file
  res.sendFile(filePath, { title: 'Packing' }); // Send the file using the absolute path
};

module.exports = {
  getPackingPage
};