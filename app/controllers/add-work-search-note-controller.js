const express = require('express');
const router = new express.Router({ mergeParams: true });
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

/* eslint-disable no-underscore-dangle */

const validator = {
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

router.get('/', validator.get, csrfProtection, (req, res) => {
  res.render('add-work-search-note');
});

module.exports = router;
