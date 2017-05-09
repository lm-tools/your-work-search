const express = require('express');
const router = new express.Router({ mergeParams: true });
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');

const validator = {
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

/* GET home page. */
router.get('/', validator.get, (req, res) =>
  res.render('confirmation',
    {
      description: req.query.description,
      accountId: req.params.accountId,
    }));

module.exports = router;
