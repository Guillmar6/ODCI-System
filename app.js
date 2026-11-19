var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit');

var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
const apisAuthRouter = require('./routes/apisAuth');
const apisNoAuthRouter = require('./routes/apisNoAuth');
const adminRouter = require('./routes/admin');
const { 
  authenticateToken,
  authorizedRole
} = require('./config/auth');

var app = express();
const limiter = rateLimit({
  windowMs: 30000,
  max: 15,
  message: 'Too many requests. Please try again later.'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/api', apisNoAuthRouter);
app.use('/api', authenticateToken, authorizedRole('admin', 'superAdmin'), apisAuthRouter);
app.use('/admin', authenticateToken, authorizedRole('admin', 'superAdmin'), adminRouter);

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
  res.render('error');
});

module.exports = app;
