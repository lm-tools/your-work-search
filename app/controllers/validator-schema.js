const Joi = require('joi');

module.exports = {
  accountId: Joi.string(),
  jobId: Joi.number().integer().positive(),
};
