var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var usersRouter = require('./routes/users');
var currencyRouter = require('./routes/currency');
var countryRouter = require('./routes/country');
var exchangeRouter = require('./routes/exchange');

app.use((req, res, next) => {
  req.db = db; // Attach db object to the request
  next(); // Call the next middleware
});

app.use('/users', usersRouter);
app.use('/currency', currencyRouter);
app.use('/country', countryRouter);
app.use('/exchange', exchangeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Setup DB connection
const db = require('knex')({
  client: 'pg',
  connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgresPass1',
      database : 'travelone'
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
