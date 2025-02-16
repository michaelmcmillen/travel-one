var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
const cors = require('cors');

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
var currencyRouter = require('./routes/currency');
var countryRouter = require('./routes/country');
var exchangeRouter = require('./routes/exchange');
const { config } = require('process');

// Attach DB to all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Endpoints
app.use('/currency', currencyRouter);
app.use('/country', countryRouter);
app.use('/exchange', exchangeRouter);

// Catch 404s and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
