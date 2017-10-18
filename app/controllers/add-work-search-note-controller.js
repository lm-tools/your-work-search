const express = require('express');
const router = new express.Router({ mergeParams: true });
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const AddWorkSearchNoteViewModel = require('./add-work-search-note-view-model');

/* eslint-disable no-underscore-dangle */

const validator = {
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
};

router.get('/', validator.get, csrfProtection, (req, res) => {
  res.render('add-work-search-note', new AddWorkSearchNoteViewModel(req.params.accountId, req.body, req.csrfToken(), null));
});

module.exports = router;
