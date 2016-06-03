const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();
const Jobs = require('../models/jobs-model');

/* GET home page. */
router.get('/', (req, res) => {
  const accountId = req.query.id || uuid.v4();
  res.redirect(`/${accountId}`);
});

router.get('/:accountId', (req, res, next) => {
  Jobs
    .findAllByAccountId(req.params.accountId)
    .then((jobs) => res.render('index',
      { title: 'Dashboard', accountId: req.params.accountId, jobs: jobs.toJSON() }))
    .catch((err) => next(err));
});

module.exports = router;
