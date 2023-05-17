"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Grant {
    static async create({ grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements }) {
      const result = await db.query(
        `INSERT INTO grants (grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements`,
        [grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements],
      );
  
      return result.rows[0];
    }
  
    // Similar methods for get, update, and remove go here...
  }
module.exports = Grant;