const express = require("express");

const jsonschema = require("jsonschema");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const { createToken } = require("../helpers/tokens")
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

const User = require("../models/user");
const Application = require("../models/application");

const router = express.Router();

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.id);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.id, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.delete(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

// route to get all businesses for a user
router.get("/:id/businesses", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const businesses = await User.getUserBusinesses(req.params.id);
    return res.json({ businesses });
  } catch (err) {
    return next(err);
  }
});

// route to get a specific business for a user
router.get("/:id/businesses/:businessId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const business = await User.getUserBusiness(req.params.userId, req.params.businessId);
    return res.json({ business });
  } catch (err) {
    return next(err);
  }
});

// route to get all farms for a user
router.get("/:id/farms", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const farms = await User.getUserFarms(req.params.id);
    return res.json({ farms });
  } catch (err) {
    return next(err);
  }
});

// route to get a specific farm for a user
router.get("/:id/farms/:farmId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const farm = await User.getUserFarm(req.params.userId, req.params.farmId);
    return res.json({ farm });
  } catch (err) {
    return next(err);
  }
});

// route to get all applications for a user
router.get("/:id/applications", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const applications = await Application.get(req.params.id);
    return res.json({ applications });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
