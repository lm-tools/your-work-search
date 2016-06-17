const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddJobViewModel = require('./add-job-view-model');
const progression = require('../models/progression');
const moment = require('moment');

function parseDeadline(deadlineString) {
  const dateFormat = !deadlineString.includes('-') ? 'DD/MM/YYYY' : undefined;
  return deadlineString ? moment(deadlineString, dateFormat).format() : null;
}

function validateDeadline(deadline, req) {
  if (!deadline) { return; }

  if (deadline.includes('-')) {
    req.checkBody('deadline', 'Deadline should be in "dd/mm/yyyy" format').isDate();
  } else {
    req.checkBody('deadline', 'Deadline should be in "dd/mm/yyyy" format')
      .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/);
  }
}

router.get('/new', (req, res) => {
  res.render('add-job', new AddJobViewModel(req.params.accountId, req.body));
});

router.post('/new', (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const deadline = req.body.deadline;
  req.checkBody('title', 'Job title is required').notEmpty();
  validateDeadline(deadline, req);

  if (req.validationErrors()) {
    return res.render('add-job',
      new AddJobViewModel(accountId, req.body, req.validationErrors()));
  }

  const jobData = Object.assign({}, req.body,
    { accountId, status: progression[0], status_sort_index: 0 },
    { deadline: parseDeadline(deadline) });

  return new Jobs(jobData).save()
    .then(() => res.redirect(`${basePath}/${accountId}`))
    .catch((err) => next(err));
});

router.patch('/:jobId', (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  const jobId = req.params.jobId;
  const updateData = req.body;

  if (updateData.status) {
    updateData.status_sort_index = progression.indexOf(updateData.status) || 0;
  }

  new Jobs({ id: jobId })
    .save(updateData, { method: 'update', patch: true })
    .then(() => res.redirect(`${basePath}/${accountId}`))
    .catch((err) => next(err));
});

module.exports = router;
