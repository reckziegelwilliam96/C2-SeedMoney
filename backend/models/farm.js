"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Farm {
    static async create({ farmID, userID, farmName, farmLocation, farmSize, cropLivestock }) {
      const result = await db.query(
        `INSERT INTO farms (farmID, userID, farmName, farmLocation, farmSize, cropLivestock)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING farmID, userID, farmName, farmLocation, farmSize, cropLivestock`,
        [farmID, userID, farmName, farmLocation, farmSize, cropLivestock],
      );
  
      return result.rows[0];
    }

    // Similar methods for get, update, and remove go here...
}

module.exports = Farm;