const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();
const Jobs = require('../models/jobs-model');

/* GET home page. */
router.get('/', (req, res) => {
  const id = req.query.id || uuid.v4();
  res.redirect(`/${id}`);
});

router.get('/:id', (req, res, next) => {
  Jobs
    .findAllByAccountId(req.params.id)
    .then((jobs) => res.render('index',
      { title: 'Dashboard', id: req.params.id, jobs: jobs.toJSON() }))
    .catch((err) => next(err));
});

module.exports = router;
