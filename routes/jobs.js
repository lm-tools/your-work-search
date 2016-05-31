const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');

router.get('/new', (req, res) => {
  res.render('jobs-new', { id: req.params.id });
});

router.post('/new', (req, res, next) => {
  req.checkBody('title', 'Job title is required').notEmpty();

  if (req.validationErrors()) {
    const body = Object.assign({ errors: req.validationErrors() }, { id: req.params.id }, req.body);
    return res.render('jobs-new', body);
  }
  return new Jobs(req.body).save()
    .then(() => res.redirect(`/${req.params.id}`))
    .catch((err) => next(err));
});

module.exports = router;
