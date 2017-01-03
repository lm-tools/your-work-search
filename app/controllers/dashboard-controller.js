const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const DashboardViewModel = require('./dashboard-view-model');

router.get('/', (req, res, next) => {
  const accountId = req.params.accountId;
  const focus = req.query.focus;
  const sort = req.query.sort || 'created';
  const filter = req.query.filter || 'all';

  Jobs
    .findAllByAccountId(accountId, { sort, filter })
    .then((findJobsResult) => res.render('dashboard',
      new DashboardViewModel(
        accountId, findJobsResult.jobs, findJobsResult.totalSavedJobs, sort, filter, focus)
    ))
    .catch((err) => next(err));
});

module.exports = router;
