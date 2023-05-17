"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Farm = require("../models/farm");
const farmNewSchema = require("../schemas/farmNew.json");
const farmUpdateSchema = require("../schemas/farmUpdate.json");

const router = express.Router();

router.post("/", ensureAdmin, async function (req, res, next) {
    const farm = await Farm.create(req.body);
    res.json({ farm });
});

router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    const farm = await Farm.get(req.params.id);
    res.json({ farm });
});

router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    const farm = await Farm.update(req.params.id, req.body);
    res.json({ farm });
});

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    await Farm.remove(req.params.id);
    res.json({ message: 'Farm deleted' });
});

module.exports = router;
