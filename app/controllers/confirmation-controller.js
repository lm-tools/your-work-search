const express = require('express');
const router = new express.Router({ mergeParams: true });
const validateAccountId = require('./common-validator').accountIdParameter;

/* GET home page. */
router.get('/', validateAccountId, (req, res) =>
  res.render('confirmation',
    {
      description: req.query.description,
      accountId: req.params.accountId,
    }));

module.exports = router;
