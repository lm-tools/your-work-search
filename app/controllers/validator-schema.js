const Joi = require('joi');

const ratings = require('../models/ratings');
const progression = require('../models/progression');

module.exports = {
  accountId: Joi.string(),
  jobId: Joi.number().integer().positive(),
  rating: Joi.any().valid(ratings()),
  initialStatus: Joi.any().valid(progression.getInitialSubset()),
  status: Joi.any().valid(progression.getAllIds()),
  title: Joi.string(),
  employer: Joi.string(),
  sourceUrl: Joi.string(),
  sourceType: Joi.any().valid(['inPerson', 'online']),
  deadlineDate: Joi.date(),
  applicationDate: Joi.date(),
  interviewDate: Joi.date(),
  csrfToken: Joi.any(),
};
