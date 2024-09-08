var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
var usersRouter = require('./routes/users');
var currencyRouter = require('./routes/currency');
var countryRouter = require('./routes/country');
var exchangeRouter = require('./routes/exchange');

// Attach DB to all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Endpoints
app.use('/users', usersRouter);
app.use('/currency', currencyRouter);
app.use('/country', countryRouter);
app.use('/exchange', exchangeRouter);

// Setup DB connection
const db = require('knex')({
  client: 'pg',
  connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgresPass1',
      database : 'travelone'
  }
});

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
