const express = require('express');
const router = new express.Router({ mergeParams: true });
const Joi = require('joi');
const celebrate = require('celebrate');
const moment = require('moment');

const validator = celebrate({
  body: {
    sampleDate: Joi.date(),
    sampleDate2: Joi.date(),
  }
});


function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

router.get('/', (req, res) => {
  res.render('test', {
    sampleDate: formatDateToISO(moment().add(1, 'day').toDate()),
    sampleDate2: formatDateToISO(moment().add(4, 'day').toDate()),
  });
});


router.post('/', validator, (req, res) => {
  console.log(req.body.sampleDate);
  res.render('test', {
    sampleDate: formatDateToISO(req.body.sampleDate),
    sampleDate2: formatDateToISO(req.body.sampleDate2),
  });
});

module.exports = router;
