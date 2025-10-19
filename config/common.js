// Common config to use across backend JS

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { delay };