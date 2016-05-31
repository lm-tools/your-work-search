const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
const cons = require('consolidate');
app.engine('mustache', cons.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware to set default layouts.
// This must be done per request (and not via app.locals) as the Consolidate.js
// renderer mutates locals.partials :(
app.use((req, res, next) => {
  /* eslint no-param-reassign: "off" */
  res.locals = {
    partials: {
      layout: 'layouts/main',
      govukTemplate: '../vendor/govuk_template_mustache_inheritance/views/layouts/govuk_template',
    },
  };
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname,
  'vendor', 'govuk_template_mustache_inheritance', 'assets', 'images', 'favicon.ico')));

// Configure logging
app.use(logger.init(app.get('env')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery-ui/themes/base/minified')));
app.use(express.static(path.join(__dirname,
  'vendor', 'govuk_template_mustache_inheritance', 'assets')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
