const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddJobViewModel = require('./add-job-view-model');
const progression = require('../models/progression');
const i18n = require('i18n');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

/* eslint-disable no-underscore-dangle */

const validator = {
  post: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
    body: {
      title: validatorSchema.title.allow(''),
      employer: validatorSchema.employer.allow(''),
      sourceUrl: validatorSchema.sourceUrl.allow(''),
      sourceType: validatorSchema.sourceType,
      rating: validatorSchema.rating,
      status: validatorSchema.initialStatus,
      deadlineDate: validatorSchema.deadlineDate.allow(''),
      applicationDate: validatorSchema.applicationDate.allow(''),
      interviewDate: validatorSchema.interviewDate.allow(''),
      _csrf: validatorSchema.csrfToken,
    },
  }),
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

router.get('/', validator.get, csrfProtection, (req, res) => {
  res.render('add-job', new AddJobViewModel(req.params.accountId, req.body, req.csrfToken(), null));
});


router.post('/', validator.post, csrfProtection, (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  req.checkBody('title', i18n.__('validation.job-title-empty')).notEmpty();
  req.checkBody('status', i18n.__('validation.status-empty')).notEmpty();

  if (req.validationErrors()) {
    return res.render('add-job',
      new AddJobViewModel(accountId, req.body, req.csrfToken(), req.validationErrors()));
  }

  const jobData = Object.assign({}, req.body, {
    accountId,
    status_sort_index: progression.getById(req.body.status).order,
  });

  delete jobData._csrf;

  const dateFieldToKeep = progression.getById(jobData.status).dateField;
  const dateFieldToDelete = progression.getAllDateFields().filter(df => df !== dateFieldToKeep);

  dateFieldToDelete.forEach(df => { delete jobData[df]; });
  if (jobData[dateFieldToKeep] === '') { delete jobData[dateFieldToKeep]; }

  return new Jobs(jobData).save()
    .then((job) => res.redirect(`${basePath}/${accountId}?focus=${job.id}`))
    .catch((err) => next(err));
});

module.exports = router;
