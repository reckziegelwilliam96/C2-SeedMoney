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
  
    static async get(grantID) {
        const result = await db.query(
          `SELECT grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements
           FROM grants
           WHERE grantID = $1`,
          [grantID],
        );
        const grant = result.rows[0];
    
        if (!grant) throw new NotFoundError(`No application: ${grantID}`);
    
        return grant;
      }
    
      static async update(grantID, data) {
        const { setCols, values } = sqlForPartialUpdate(
          data,
          {
            grantName: "grantName",
            grantDescription: "grantDescription",
            grantAmount: "grantAmount",
            applicationDeadline: "applicationDeadline",
            eligibilityRequirements: "eligibilityRequirements"
          });
        const grantIDVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE applications 
                          SET ${setCols} 
                          WHERE grantID = ${grantIDVarIdx} 
                          RETURNING grantID, grantName, grantDescription, grantAmount, applicationDeadline, eligibilityRequirements`;
        const result = await db.query(querySql, [...values, grantID]);
        const grant = result.rows[0];
    
        if (!grant) throw new NotFoundError(`No user: ${grantID}`);
    
        return grant;
      }
    
      static async remove(grantID) {
        const result = await db.query(
          `DELETE
           FROM grants
           WHERE grantID = $1
           RETURNING grantID`,
          [grantID]);
        const grant = result.rows[0];
    
        if (!grant) throw new NotFoundError(`No user: ${grantID}`);
      }
}
module.exports = Grant;