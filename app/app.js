const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {
  Client
} = require('pg')
const config = require("./config/config")


// Routers
const indexRouter = require('./routes/index');

const app = express();

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


const createTable = function() {

  // Connection to DB
  const client = new Client({
    user: config.db.username,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port
  });

  // Connect to client.
  client.connect();

  const createTableQuery = "CREATE TABLE IF NOT EXISTS messages (" +
    "id text primary key," +
    "message text " +
    ");";

  client.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Could not create database table messages")
      process.exit(1);
    }
    client.end()
  });
}

// Create table if it does not already exist.
createTable()

module.exports = app;
