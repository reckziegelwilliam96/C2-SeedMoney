"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Application {
    static async create({ applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate }) {
      const result = await db.query(
        `INSERT INTO applications (applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate`,
        [applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate],
      );
  
      return result.rows[0];
    }
  
    // Similar methods for get, update, and remove go here...
  }

module.exports = Application;