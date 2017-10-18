const express = require('express');
const validate = require('uuid-validate');
const router = new express.Router();
const Jobs = require('../models/jobs-model');
const Notes = require('../models/notes-model');
const DashboardViewModel = require('./dashboard-view-model');
const Joi = require('joi');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
const moment = require('moment');

const validator = {
  getAccount: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
    query: Joi.object({
      sort: Joi.any().valid(['', 'created', 'updated', 'title', 'employer', 'status']),
      focus: validatorSchema.jobId,
      id: validatorSchema.accountId,
    }).unknown(),
  }),
};

/* GET home page. */
router.get('/', (req, res) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.query.id;

  if (accountId && validate(accountId)) {

    Promise.all([Jobs.findAllByAccountId(accountId), Notes.findAllByAccountId(accountId)])
      .then(([findJobsResult, findNotesResult]) => {
        if (findJobsResult.totalSavedJobs > 0 || findNotesResult.totalNotes > 0) {
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

  Promise.all([Jobs.findAllByAccountId(accountId), Notes.findAllByAccountId(accountId)])
    .then(([findJobsResult, findNotesResult]) =>
      res.render('dashboard',
        new DashboardViewModel(
          accountId, findJobsResult.jobs, findJobsResult.totalSavedJobs, findNotesResult.notes, sort, focus)
      ))
    .catch((err) => next(err));
});

module.exports = router;
