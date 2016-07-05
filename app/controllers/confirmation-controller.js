const express = require('express');
const router = new express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', (req, res) =>
  res.render('confirmation',
    {
      description: req.query.description,
      accountId: req.params.accountId,
    }));

module.exports = router;
