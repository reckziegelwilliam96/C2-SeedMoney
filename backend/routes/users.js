const express = require("express");

const jsonschema = require("jsonschema");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const { createToken } = require("../helpers/tokens")
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

const User = require("../models/user");
const Application = require("../models/application");

const router = express.Router();



router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
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
router.get("/:id/businesses",  async function (req, res, next) {
  try {
    const businesses = await User.getUserBusinesses(req.params.id);
    console.log('Route getUserBusinesses:', businesses); 
    return res.json({ businesses });
  } catch (err) {
    return next(err);
  }
});

// route to get a specific business for a user
router.get("/:id/businesses/:businessId", ensureLoggedIn , async function (req, res, next) {
  try {
    const business = await User.getUserBusiness(req.body);
    return res.json({ business });
  } catch (err) {
    return next(err);
  }
});

// route to get all farms for a user
router.get("/:id/farms", async function (req, res, next) {
  try {
    const farms = await User.getUserFarms(req.params.id);
    console.log('Route getUserFarms:', farms); 
    return res.json({ farms });
  } catch (err) {
    return next(err);
  }
});

// route to get a specific farm for a user
router.get("/:id/farms/:farmId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const farm = await User.getUserFarm(req.body);
    return res.json({ farm });
  } catch (err) {
    return next(err);
  }
});

// route to get all applications for a user
router.get("/:id/applications", async function (req, res, next) {
  try {
    const applications = await User.getApplications(req.params.id);
    return res.json({ applications });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
