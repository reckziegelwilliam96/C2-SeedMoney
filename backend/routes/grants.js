"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Grant = require("../models/grant");
const grantNewSchema = require("../schemas/grantNew.json");
const grantUpdateSchema = require("../schemas/grantUpdate.json");

const router = express.Router();

router.post('/', ensureAdmin, async (req, res, next) => {
    const grant = await Grant.create(req.body);
    res.json({ grant });
  });
  
router.get('/:id', ensureAdmin, async (req, res, next) => {
  const grant = await Grant.get(req.params.id);
  res.json({ grant });
});

router.patch('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  const grant = await Grant.update(req.params.id, req.body);
  res.json({ grant });
});

router.delete('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  await Grant.remove(req.params.id);
  res.json({ message: 'Grant deleted' });
});

module.exports = router;