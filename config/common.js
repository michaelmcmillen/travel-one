// Common config to use across backend JS

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randDate = () => {
  let start = new Date(2026, 1, 1);
  let end = new Date(2026, 2, 0);
  return (date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split("T")[0]);
};

module.exports = { delay, randDate };
