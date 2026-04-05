// Common config to use across backend JS

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDate = (month) => {
  const startDate = new Date(Date.parse(month.slice(0, 3) + "01 2026"));
  const startMonthNumeric = startDate.getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, startMonthNumeric, 0).getDate();
  const endDate = new Date(currentYear, startMonthNumeric, daysInMonth);

  const randDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  )
    .toISOString()
    .split("T")[0];

  return randDate;
};

module.exports = { delay, randomDate };
