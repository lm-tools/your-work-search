const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddJobViewModel = require('./add-job-view-model');
const UpdateJobViewModel = require('./update-job-view-model');
const progression = require('../models/progression');
const i18n = require('i18n');

function buildQueryParams(job) {
  const params = { focus: job.id };
  return Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');
}


router.get('/new', (req, res) => {
  res.render('add-job', new AddJobViewModel(req.params.accountId, req.body));
});

router.post('/new', (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  req.checkBody('title', 'Job title is required').notEmpty();

  if (req.validationErrors()) {
    return res.render('add-job',
      new AddJobViewModel(accountId, req.body, req.validationErrors()));
  }

  const initialProgression = progression.getInitial();
  const jobData = Object.assign({}, req.body, {
    accountId,
    status: initialProgression.id,
    status_sort_index: initialProgression.order,
  });

  return new Jobs(jobData).save()
    .then((job) => res.redirect(`${basePath}/${accountId}?focus=${job.id}`))
    .catch((err) => next(err));
});

router.get('/:jobId', (req, res, next) => {
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  const basePath = req.app.locals.basePath;

  return new Jobs({ id: jobId, accountId })
    .fetch()
    .then(model => {
      if (model) {
        const job = model.serialize();
        res.render('update-job', new UpdateJobViewModel(accountId, job, basePath));
      } else {
        res.status(404).render('error', { message: 'Not Found' });
      }
    })
    .catch((err) => next(err));
});

router.patch('/:jobId', (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  const updateData = req.body;

  if (updateData.status) {
    updateData.status_sort_index = progression.getById(updateData.status).order;
  }

  return new Jobs({ id: jobId })
    .save(updateData, { method: 'update', patch: true })
    .then((job) => {
      const queryParams = buildQueryParams(job);
      res.redirect(`${basePath}/${accountId}?${queryParams}#job-container-${job.id}`);
    })
    .catch((err) => next(err));
});

router.delete('/:jobId', (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  return new Jobs({ id: jobId })
    .fetch()
    .then(job => {
      // eslint-disable-next-line no-underscore-dangle
      const description = i18n.__('confirmation.jobRemoved', { jobTitle: job.get('title') });
      return job.destroy()
        .then(() => res.redirect(
          `${basePath}/${accountId}/confirmation?description=${description}`
        ));
    })
    .catch((err) => next(err));
});

module.exports = router;
