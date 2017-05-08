const Joi = require('joi');
const celebrate = require('celebrate');

module.exports = {
  accountIdParameter: celebrate({
    params: Joi.object().keys({
      accountId: Joi.string().required(),
    }),
  }),
};
