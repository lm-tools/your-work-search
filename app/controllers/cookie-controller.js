/* eslint-disable no-underscore-dangle */
const express = require('express');
const router = new express.Router();
const Joi = require('joi');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');

const validator = {
  getAccount: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
    query: Joi.object({
      id: validatorSchema.accountId,
    }).unknown(),
  }),
};

router.get('/:accountId/cookie', validator.getAccount, (req, res) => {
  const accountId = req.params.accountId;
  res.render('cookie', { accountId });
});

router.get('/cookie', (req, res) => {
  // always render cookie view in case user clicks cookie link before logging in
  res.render('cookie');
});

module.exports = router;
