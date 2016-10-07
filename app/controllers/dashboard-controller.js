const express = require('express');
const validate = require('uuid-validate');
const i18n = require('i18n');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const DashboardViewModel = require('./dashboard-view-model');

/* GET home page. */
router.get('/', (req, res) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.query.id;

  if (accountId && validate(accountId) ) {
    res.redirect(`${basePath}/${accountId}/introduction`);
  } else {
    // eslint-disable-next-line no-underscore-dangle
    res.render('error', { message: i18n.__('error.useFromUC') });
  }
});

router.get('/:accountId', (req, res, next) => {
  const accountId = req.params.accountId;
  const focus = req.query.focus;
  const sort = req.query.sort || 'created';
  const filter = req.query.filter || 'all';

  Jobs
    .findAllByAccountId(accountId, { sort, filter })
    .then((jobModels) => res.render('dashboard',
      new DashboardViewModel(accountId, jobModels.serialize(), sort, filter, focus)
    ))
    .catch((err) => next(err));
});

module.exports = router;
