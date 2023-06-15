"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Application = require("../models/application");
const applicationNewSchema = require("../schemas/applicationNew.json");
const applicationUpdateSchema = require("../schemas/applicationUpdate.json");

const router = express.Router();

router.post('/', ensureCorrectUserOrAdmin, async (req, res, next) => {
    const application = await Application.create(req.body);
    res.json({ application });
  });

router.get('/', ensureCorrectUserOrAdmin, async(req, res, next) => {
  const applications = await Application.getAll(req.params.id);
  res.json({ applications });
})
  
router.get('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  const application = await Application.get(req.params.id);
  res.json({ application });
});

router.patch('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  const application = await Application.update(req.params.id, req.body);
  res.json({ application });
});

router.delete('/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
  await Application.remove(req.params.id);
  res.json({ message: 'Application deleted' });
});
  