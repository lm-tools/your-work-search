const express = require('express');
const router = new express.Router({ mergeParams: true });
const i18n = require('i18n');
const Notes = require('../models/notes-model');
const celebrate = require('celebrate');
const validatorSchema = require('./validator-schema');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const AddNoteViewModel = require('./add-note-view-model');

/* eslint-disable no-underscore-dangle */

const validator = {
  get: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
  }),
  post: celebrate({
    params: {
      accountId: validatorSchema.accountId.required(),
    },
    body: {
      details: validatorSchema.details.allow(''),
      _csrf: validatorSchema.csrfToken,
    },
  }),
};

router.get('/', validator.get, csrfProtection, (req, res) => {
  res.render('add-note', new AddNoteViewModel(req.params.accountId, req.body, req.csrfToken(), null));
});

router.post('/', validator.post, csrfProtection, (req, res, next) => {
  const basePath = req.app.locals.basePath;
  const accountId = req.params.accountId;
  req.checkBody('details', i18n.__('validation.note-empty')).notEmpty();

  if (req.validationErrors()) {
    return res.render('add-note',
      new AddNoteViewModel(accountId, req.body, req.csrfToken(), req.validationErrors()));
  }

  const noteData = Object.assign({}, req.body, {
    accountId
  });

  delete noteData._csrf;

  return new Notes(noteData).save()
    .then(note => res.redirect(`${basePath}/${accountId}?focus=${note.id}`))
    .catch(err => next(err));
});

module.exports = router;
