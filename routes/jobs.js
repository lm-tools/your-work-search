const express = require('express');
const router = new express.Router({ mergeParams: true });

router.get('/new', (req, res) => {
  res.render('jobs-new', { id: req.params.id });
});

router.post('/', (req, res) => {
  res.redirect(`/${req.params.id}`);
});

module.exports = router;
