const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");

const jsonschema = require("jsonschema");
const businessNewSchema = require("../schemas/businessNew.json");
const businessUpdateSchema = require("../schemas/businessUpdate.json");

const Business = require("../models/business");

const router = new express.Router();

router.post("/register", ensureLoggedIn, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, businessNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      
      const businessData = {
        ...req.body,
        user_id: req.user.id  // Get user id from req.user, which is set by the authentication middleware
      };
  
      const business = await Business.create(businessData);
  
      return res.status(201).json({ business });
    } catch (err) {
      return next(err);
    }
  });

router.get('/:id', ensureLoggedIn, async function(req, res, next) {
    try {
      const business = await Business.get(req.params.id);
      return res.json({ business });
    } catch (err) {
      return next(err);
    }
  });
  
  router.patch('/:id', ensureLoggedIn, async function(req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, businessUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const business = await Business.update(req.params.id, req.body);
      return res.json({ business });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete('/:id', ensureLoggedIn, async function(req, res, next) {
    try {
      await Business.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });
  
  router.get('/:id/farms', ensureLoggedIn, async function(req, res, next) {
    try {
      const farms = await Business.getFarms(req.params.id);
      return res.json({ farms });
    } catch (err) {
      return next(err);
    }
  });
  
  router.get('/:id/user', ensureLoggedIn, async function(req, res, next) {
    try {
      const user = await Business.getUser(req.params.id);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });
  