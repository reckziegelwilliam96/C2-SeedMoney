"use strict";


const express = require("express");


const jsonschema = require("jsonschema");
const grantNewSchema = require("../schemas/grantNew.json");
const grantUpdateSchema = require("../schemas/grantUpdate.json");

const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

const Grant = require("../models/grant");

const router = new express.Router();

router.post('/', ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, grantNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const grant = await Grant.create(req.body);
    res.json({ grant });
  } catch (err) {
    return next(err);
  }
});
  
router.get('/:id', ensureAdmin, async (req, res, next) => {
  try { 
    const grant = await Grant.get(req.params.id);
    res.json({ grant });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, grantUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const grant = await Grant.update(req.params.id, req.body);
    res.json({ grant });
  } catch (err) {
    return next(err);
  }

});

router.delete('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    await Grant.remove(req.params.id);
    res.json({ message: 'Grant deleted' });
  } catch(err){
    return next(err);
  }

});

module.exports = router;