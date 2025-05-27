const indexService = require('../services/indexService');

// Get the index page
const indexPage = async (req, res) => {
  const indexPage = await indexService.fetchIndex(req)
  res.sendFile(indexPage, { title: 'Home' }); // Send the file using the absolute path
};

module.exports = {
    indexPage
};