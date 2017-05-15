const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const ratings = require('../models/ratings');
const progression = require('../models/progression');

module.exports = {
  accountId: Joi.string(),
  jobId: Joi.number().integer().positive(),
  rating: Joi.any().valid(ratings),
  initialStatus: Joi.any().valid(progression.getInitialSubset()),
  status: Joi.any().valid(progression.getAllIds()),
  title: Joi.string(),
  employer: Joi.string(),
  sourceUrl: Joi.string(),
  sourceType: Joi.any().valid(['inPerson', 'online']),
  deadlineDate: Joi.date().format('DD/MM/YYYY'),
  applicationDate: Joi.date().format('DD/MM/YYYY'),
  interviewDate: Joi.date().format('DD/MM/YYYY'),
};
