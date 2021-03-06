var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const corsMiddleware = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const essentialsRouter = require('./routes/essentials');
const varietiesRouter = require('./routes/varieties');
const blogRouter = require('./routes/blog');
const loginRouter = require('./routes/login');

var app = express();

app.use(corsMiddleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/essentials', essentialsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/varieties', varietiesRouter);
app.use('/blog', blogRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
