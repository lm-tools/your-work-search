const express = require('express');
const uuid = require('node-uuid');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const id = req.query.id || uuid.v4();
  res.redirect(`/${id}`);
});

router.get('/:id', (req, res) => {
  res.render('index', { title: 'Dashboard', id: req.params.id });
});

module.exports = router;
