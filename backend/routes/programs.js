"use strict";

const express = require("express");


const jsonschema = require("jsonschema");
const programNewSchema = require("../schemas/programNew.json");
const programUpdateSchema = require("../schemas/programUpdate.json");
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

const Program = require("../models/program");

const router = new express.Router();

// Create a new program
router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, programNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const program = await Program.create(req.body);
        return res.status(201).json({ program });
    } catch (err) {
        return next(err);
      }
});

// Get a specific program by ID
router.get("/:id", ensureAdmin, async function (req, res, next) {
    try {
        const program = await Program.get(req.params.id);
        return res.json({ program });
    } catch (err) {
        return next(err);
    }
});

// Update a specific program by ID
router.patch("/:id", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, programUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const program = await Program.update(req.params.id, req.body);
        return res.json({ program });
    } catch (err) {
        return next(err);
    }
});

// Delete a specific program by ID
router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
        await Program.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
