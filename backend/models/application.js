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
  
    static async get(applicationID) {
        const result = await db.query(
          `SELECT applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate
           FROM applications
           WHERE applicationID = $1`,
          [applicationID],
        );
        const application = result.rows[0];
    
        if (!application) throw new NotFoundError(`No application: ${applicationID}`);
    
        return user;
      }
    
      static async update(applicationID, data) {
        const { setCols, values } = sqlForPartialUpdate(
          data,
          {
            applicationStatus: "applicationStatus",
            applicationSubmissionDate: "applicationSubmissionDate",
            applicationResponseData: "applicationResponseDate"
          });
        const appIDVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE applications 
                          SET ${setCols} 
                          WHERE applicationID = ${appIDVarIdx} 
                          RETURNING applicationID, userID, grantID, applicationStatus, applicationSubmissionDate, applicationResponseDate`;
        const result = await db.query(querySql, [...values, applicationID]);
        const application = result.rows[0];
    
        if (!application) throw new NotFoundError(`No user: ${applicationID}`);
    
        return application;
      }
    
      static async remove(applicationID) {
        const result = await db.query(
          `DELETE
           FROM applications
           WHERE applicationID = $1
           RETURNING applicationID`,
          [applicationID]);
        const application = result.rows[0];
    
        if (!application) throw new NotFoundError(`No user: ${applicationID}`);
      }
}


module.exports = Application;