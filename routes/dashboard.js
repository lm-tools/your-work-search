const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const progression = require('../lib/progression');

/* GET home page. */
router.get('/', (req, res) => {
  const accountId = req.query.id || uuid.v4();
  res.redirect(`/${accountId}`);
});

router.get('/:accountId', (req, res, next) => {
  const accountId = req.params.accountId;
  Jobs
    .findAllByAccountId(accountId)
    .then((jobs) => res.render('index',
      {
        accountId,
        jobs: jobs.toJSON(),
        progression,
        title: 'Dashboard',
      }
    ))
    .catch((err) => next(err));
});

module.exports = router;
