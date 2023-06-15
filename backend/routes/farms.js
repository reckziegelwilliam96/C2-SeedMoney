const express = require("express");
const Farm = require("../models/farm");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const farmNewSchema = require("../schemas/farmNew.json");
const jsonschema = require("jsonschema");

const router = express.Router();

// Create new farm
router.post("/register", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, farmNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const farm = await Farm.create(req.body);
        return res.status(201).json({ farm });
    } catch (err) {
        return next(err);
    }
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
