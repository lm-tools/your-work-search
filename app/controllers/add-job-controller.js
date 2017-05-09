const express = require('express');
const router = new express.Router({ mergeParams: true });
const Jobs = require('../models/jobs-model');
const AddJobViewModel = require('./add-job-view-model');
const progression = require('../models/progression');
const ratings = require('../models/ratings');
const i18n = require('i18n');
const Joi = require('joi');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
/* eslint-disable no-underscore-dangle */

const validator = {
  post: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
    body: Joi.object().keys({
      title: Joi.string().allow(''),
      employer: Joi.string().allow(''),
      sourceUrl: Joi.string().allow(''),
      sourceType: Joi.any().valid(['inPerson', 'online']),
      rating: Joi.any().valid(ratings),
      status: Joi.any().valid(progression.getInitialSubset()),
    }),
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

  return new Jobs(jobData).save()
    .then((job) => res.redirect(`${basePath}/${accountId}?focus=${job.id}`))
    .catch((err) => next(err));
});

module.exports = router;
