const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');

router.get('/new', (req, res) => {
  res.render('jobs-new', { accountId: req.params.accountId });
});

router.post('/new', (req, res, next) => {
  req.checkBody('title', 'Job title is required').notEmpty();

  if (req.validationErrors()) {
    const body = Object.assign(
      { errors: req.validationErrors() },
      { accountId: req.params.accountId },
      req.body
    );
    return res.render('jobs-new', body);
  }
  return new Jobs(Object.assign(req.body, { accountId: req.params.accountId })).save()
    .then(() => res.redirect(`/${req.params.accountId}`))
    .catch((err) => next(err));
});

module.exports = router;
