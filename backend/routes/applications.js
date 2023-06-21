"use strict";
const express = require("express");

const jsonschema = require("jsonschema");
const applicationNewSchema = require("../schemas/applicationNew.json");
const applicationUpdateSchema = require("../schemas/applicationUpdate.json");

const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");


const Application = require("../models/application");


const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, applicationNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const application = await Application.create(req.body);
    res.json({ application });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async(req, res, next) => {
  const applications = await Application.getAll(req.params.id);
  res.json({ applications });
})
  
router.get('/:id', async (req, res, next) => {
  const application = await Application.get(req.params.id);
  res.json({ application });
});

router.patch('/:id', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, applicationUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const application = await Application.update(req.params.id, req.body);
    res.json({ application });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  await Application.remove(req.params.id);
  res.json({ message: 'Application deleted' });
});

module.exports = router;