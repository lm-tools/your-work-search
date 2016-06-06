const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddAJobView = require('./AddAJobView');
const progression = require('../lib/progression');
const moment = require('moment');

function parseDeadline(deadlineString) {
  return deadlineString ? moment(deadlineString, 'DD/MM/YYYY').format() : null;
}

router.get('/new', (req, res) => {
  res.render('jobs-new', new AddAJobView(req.params.accountId, req.body));
});

router.post('/new', (req, res, next) => {
  const accountId = req.params.accountId;
  req.checkBody('title', 'Job title is required').notEmpty();
  if (req.body.deadline) {
    req.checkBody('deadline', 'Deadline should be in "dd/mm/yyyy" format')
      .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/);
  }

  if (req.validationErrors()) {
    return res.render('jobs-new',
      new AddAJobView(accountId, req.body, req.validationErrors()));
  }

  const jobData = Object.assign({}, req.body, { accountId, status: progression[0] },
    { deadline: parseDeadline(req.body.deadline) });

  return new Jobs(jobData).save()
    .then(() => res.redirect(`/${accountId}`))
    .catch((err) => next(err));
});

router.patch('/:jobId', (req, res, next) => {
  const jobId = req.params.jobId;
  new Jobs({ id: jobId })
    .save(req.body, { method: 'update', patch: true })
    .then(() => res.redirect(`/${req.params.accountId}#job-${jobId}`))
    .catch((err) => next(err));
});

module.exports = router;
