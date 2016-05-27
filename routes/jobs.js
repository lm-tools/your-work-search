const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');

router.get('/new', (req, res) => {
  res.render('jobs-new', { id: req.params.id });
});

router.post('/', (req, res, next) =>
  new Jobs(req.body).save()
    .then(() => res.redirect(`/${req.params.id}`))
    .catch((err) => next(err)));

module.exports = router;
