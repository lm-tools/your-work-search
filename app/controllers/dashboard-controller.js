const express = require('express');
const validate = require('uuid-validate');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const DashboardViewModel = require('./dashboard-view-model');
const Joi = require('joi');
const celebrate = require('celebrate');

const validator = {
  getAccount: celebrate({
    params: Joi.object().keys({
      accountId: Joi.string().required(),
    }),
    query: Joi.object().keys({
      sort: Joi.any().valid(['', 'created', 'updated', 'title', 'employer', 'status']),
      focus: Joi.number().integer().positive(),
      id: Joi.any(),
    }).unknown(),
  }),
};

/* GET home page. */
router.get('/', (req, res) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.query.id;

  if (accountId && validate(accountId)) {
    Jobs
      .findAllByAccountId(accountId)
      .then((findJobsResult) => {
        if (findJobsResult.totalSavedJobs > 0) {
          res.redirect(`${basePath}/${accountId}`);
        } else {
          res.redirect(`${basePath}/${accountId}/jobs/new`);
        }
      });
  } else {
    res.render('missing-account-id');
  }
});

router.get('/:accountId', validator.getAccount, (req, res, next) => {
  const accountId = req.params.accountId;
  const focus = req.query.focus;
  const sort = req.query.sort || 'created';

  // TEMP FIX FOR FAILED EXAMPLE URL - TO BE REMOVED
  const hasIdQueryParams = req.query.id;

  if (accountId === 'EXAMPLE' && hasIdQueryParams) {
    const basePath = req.app.locals.basePath;
    const realAccountId = req.query.id;

    res.redirect(`${basePath}/?id=${realAccountId}`);
  }
  // END OF FIX

  Jobs
    .findAllByAccountId(accountId, { sort })
    .then((findJobsResult) => res.render('dashboard',
      new DashboardViewModel(
        accountId, findJobsResult.jobs, findJobsResult.totalSavedJobs, sort, focus)
    ))
    .catch((err) => next(err));
});

module.exports = router;
