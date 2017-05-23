const express = require('express');
const router = new express.Router({ mergeParams: true });
const celebrate = require('celebrate');
const Jobs = require('../models/jobs-model');
const UpdateJobViewModel = require('./update-job-view-model');
const progression = require('../models/progression');
const i18n = require('i18n');
const validatorSchema = require('./validator-schema');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
/* eslint-disable no-underscore-dangle */

const validator = {
  get: celebrate({
    params: {
      jobId: validatorSchema.jobId.required(),
      accountId: validatorSchema.accountId.required(),
    },
  }),
  patch: celebrate({
    params: {
      jobId: validatorSchema.jobId.required(),
      accountId: validatorSchema.accountId.required(),
    },
    body: {
      status: validatorSchema.status,
      rating: validatorSchema.rating,
      deadlineDate: validatorSchema.deadlineDate.allow(''),
      applicationDate: validatorSchema.applicationDate.allow(''),
      interviewDate: validatorSchema.interviewDate.allow(''),
      _csrf: validatorSchema.csrfToken,
    },
  }),
  delete: celebrate({
    params: {
      jobId: validatorSchema.jobId.required(),
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

function buildQueryParams(job) {
  const params = { focus: job.id };
  return Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');
}

router.get('/:jobId', validator.get, csrfProtection, (req, res, next) => {
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  const basePath = req.app.locals.basePath;

  return new Jobs({ id: jobId, accountId })
    .fetch()
    .then(model => {
      if (model) {
        const job = model.serialize();

        res.render('update-job', new UpdateJobViewModel(accountId, job, basePath, req.csrfToken()));
      } else {
        res.status(404).render('error', { message: 'Not Found' });
      }
    })
    .catch((err) => next(err));
});

router.patch('/:jobId', validator.patch, csrfProtection, (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  const updateData = req.body;
  delete updateData._csrf;

  if (req.body.status === 'applied' && req.body.applicationDate) {
    req.checkBody('applicationDate', i18n.__('validation.applicationDateInTheFuture'))
      .isNotInTheFuture();
  }
  if (req.validationErrors()) {
    return res.render('update-job',
      new UpdateJobViewModel(accountId, Object.assign({ id: jobId }, req.body),
        basePath, req.csrfToken(), req.validationErrors())
    );
  }

  if (updateData.status) {
    updateData.status_sort_index = progression.getById(updateData.status).order;
  }

  ['deadlineDate', 'applicationDate', 'interviewDate']
    .forEach(df => { if (updateData[df] === '') { delete updateData[df]; } });

  if (updateData.status === 'success') {
    updateData.successDate = new Date();
  }

  if (updateData.status === 'failure') {
    updateData.failureDate = new Date();
  }

  return new Jobs({ id: jobId })
    .save(updateData, { method: 'update', patch: true })
    .then((job) => {
      const queryParams = buildQueryParams(job);
      res.redirect(`${basePath}/${accountId}?${queryParams}#job-container-${job.id}`);
    })
    .catch((err) => next(err));
});

router.delete('/:jobId', validator.delete, csrfProtection, (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  return new Jobs({ id: jobId })
    .fetch()
    .then(job => {
      const description = i18n.__('confirmation.jobRemoved', { jobTitle: job.get('title') });
      return job.destroy()
        .then(() => res.redirect(
          `${basePath}/${accountId}/confirmation?description=${description}`
        ));
    })
    .catch((err) => next(err));
});

module.exports = router;
