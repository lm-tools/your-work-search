const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const id = req.query.id;
  res.redirect(`/${id}`);
});

router.get('/:id', (req, res) => {
  res.render('index', { title: 'Dashboard' });
});

module.exports = router;
