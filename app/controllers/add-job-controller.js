const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddJobViewModel = require('./add-job-view-model');
const progression = require('../models/progression');
const i18n = require('i18n');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
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
    },
  }),
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

router.get('/', validator.get, (req, res) => {
  res.render('add-job', new AddJobViewModel(req.params.accountId, req.body));
});


router.post('/', validator.post, (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  req.checkBody('title', i18n.__('validation.job-title-empty')).notEmpty();
  req.checkBody('status', i18n.__('validation.status-empty')).notEmpty();

  if (req.validationErrors()) {
    return res.render('add-job',
      new AddJobViewModel(accountId, req.body, req.validationErrors()));
  }

  const jobData = Object.assign({}, req.body, {
    accountId,
    status_sort_index: progression.getById(req.body.status).order,
  });

  if (jobData.status === 'interested') {
    delete jobData.applicationDate;
    delete jobData.interviewDate;

    if (jobData.deadlineDate === '') {
      delete jobData.deadlineDate;
    }
  }

  if (jobData.status === 'applied') {
    delete jobData.deadlineDate;
    delete jobData.interviewDate;

    if (jobData.applicationDate === '') {
      delete jobData.applicationDate;
    }
  }

  if (jobData.status === 'interview') {
    delete jobData.applicationDate;
    delete jobData.deadlineDate;

    if (jobData.interviewDate === '') {
      delete jobData.interviewDate;
    }
  }

  return new Jobs(jobData).save()
    .then((job) => res.redirect(`${basePath}/${accountId}?focus=${job.id}`))
    .catch((err) => next(err));
});

module.exports = router;
