const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css'));

// Ensures requests are accepted from the client when in development
app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_ORIGIN}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("dotenv").config();
const db = require('./config/db.js')

// Setup routes
const currencyRouter = require('./routes/currency');
const countryRouter = require('./routes/country');
const exchangeRouter = require('./routes/exchange');
const flightRouter = require('./routes/flight');
const { config } = require('process');

// Attach DB to all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use routes
app.use('/currency', currencyRouter);
app.use('/country', countryRouter);
app.use('/exchange', exchangeRouter);
app.use('/flight', flightRouter);

// Catch 404s and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('view engine', 'pug');

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
