"use strict";

/** Routes for authentication. */

const express = require("express");

const jsonschema = require("jsonschema");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");

const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

const User = require("../models/user");

const router = new express.Router();

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = createToken(user);
    return res.json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { email, password, firstName, lastName }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register({ ...req.body});
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
