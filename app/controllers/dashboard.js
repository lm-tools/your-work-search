const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const progression = require('../models/progression');
const i18n = require('i18n');

const dashboardJobProgression = (job) =>
  progression.map((status) => ({
    name: status,
    isChecked: (job.status === status),
    // eslint-disable-next-line no-underscore-dangle
    label: i18n.__(`progression.${status}`),
  }));

const dashboardJobs = (jobModels) =>
  jobModels
    .serialize()
    .map((job) => Object.assign({ progression: dashboardJobProgression(job) }, job));

/* GET home page. */
router.get('/', (req, res) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.query.id || uuid.v4();
  res.redirect(`${basePath}/${accountId}`);
});

router.get('/:accountId', (req, res, next) => {
  const accountId = req.params.accountId;
  Jobs
    .findAllByAccountId(accountId)
    .then((jobModels) => res.render('index',
      {
        accountId,
        jobs: dashboardJobs(jobModels),
        title: 'Dashboard',
      }
    ))
    .catch((err) => next(err));
});

module.exports = router;
