const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./logger');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const i18n = require('./middleware/i18n');
const dashboardController = require('./controllers/dashboard-controller.js');
const jobsController = require('./controllers/jobs-controller.js');
const addJobController = require('./controllers/add-job-controller.js');
const confirmationController = require('./controllers/confirmation-controller');
const errorHandler = require('./middleware/error-handler');
const healthCheckController = require('./controllers/health-check-controller');
const helmet = require('helmet');

const app = express();
i18n(app);
app.use(helmet());
app.use(helmet.referrerPolicy());

// view engine setup
const cons = require('consolidate');
app.engine('mustache', cons.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// run the whole application in a directory
const basePath = app.locals.basePath = process.env.EXPRESS_BASE_PATH || '';
const assetPath = `${basePath}/`;
const googleTagManagerId = process.env.GOOGLE_TAG_MANAGER_ID;

// Middleware to set default layouts.
// This must be done per request (and not via app.locals) as the Consolidate.js
// renderer mutates locals.partials :(
app.use((req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  Object.assign(res.locals, {
    assetPath,
    basePath,
    googleTagManagerId,
    partials: {
      layout: 'layouts/main',
      govukTemplate:
        '../../vendor/govuk_template_mustache_inheritance/views/layouts/govuk_template',
      googleTagManager: 'partials/google-tag-manager',
    },
  });
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '..',
  'vendor', 'govuk_template_mustache_inheritance', 'assets', 'images', 'favicon.ico')));

app.use('/health_check', healthCheckController);
app.use(`${basePath}/health_check`, healthCheckController);
// Configure logging
app.use(logger.init(app.get('env')));
app.use(methodOverride('_method')); // allow override of http method with '_method' querystring var
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(assetPath, express.static(path.join(__dirname, '..', 'dist', 'public')));
app.use(assetPath, express.static(path.join(__dirname, '..',
  'vendor', 'govuk_template_mustache_inheritance', 'assets')));

app.use(helmet.noCache());

app.use(`${basePath}/`, dashboardController);
app.use(`${basePath}/:accountId/jobs/new`, addJobController);
app.use(`${basePath}/:accountId/jobs`, jobsController);
app.use(`${basePath}/:accountId/confirmation`, confirmationController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

errorHandler(app);

module.exports = app;
