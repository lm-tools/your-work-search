var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
var cons = require('consolidate');
app.engine('mustache', cons.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware to set default layouts.
// This must be done per request (and not via app.locals) as the Consolidate.js
// renderer mutates locals.partials :(
app.use(function (req, res, next) {
  /* eslint no-param-reassign: "off" */
  res.locals = {
    partials: {
      layout: 'layouts/main',
      govukTemplate: '../vendor/govuk_template_mustache_inheritance/views/layouts/govuk_template'
    }
  };
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname,
  'vendor', 'govuk_template_mustache_inheritance', 'assets', 'images', 'favicon.ico')));

// Configure logging
if (app.get('env') === 'test') {
  app.use(logger('tiny', {
    stream: fs.createWriteStream(__dirname + '/logs/test.log', { flags: 'w' })
  }));
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/public')));
app.use(express.static(path.join(__dirname,
  'vendor', 'govuk_template_mustache_inheritance', 'assets')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function set404(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
