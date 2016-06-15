const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const DashboardViewModel = require('./DashboardViewModel');

/* GET home page. */
router.get('/', (req, res) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.query.id || uuid.v4();
  res.redirect(`${basePath}/${accountId}`);
});

router.get('/:accountId', (req, res, next) => {
  const accountId = req.params.accountId;
  const sort = req.query.sort;

  Jobs
    .findAllByAccountId(accountId, sort)
    .then((jobModels) => res.render('index',
      new DashboardViewModel(accountId, jobModels.serialize(), sort)
    ))
    .catch((err) => next(err));
});

module.exports = router;
