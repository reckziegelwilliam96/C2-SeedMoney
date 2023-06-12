"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Application {
    static async create({ user_id, grant_id, application_status, application_submission_date, application_response_data }) {
      const result = await db.query(
        `INSERT INTO applications (user_id, grant_id, application_status, application_submission_date, application_response_data)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, grant_id, application_status, application_submission_date, application_response_data`,
        [user_id, grant_id, application_status, application_submission_date, application_response_data],
      );
  
      return result.rows[0];
    }
  
    static async get(user_id) {
      const result = await db.query(
        `SELECT user_id, grant_id, application_status, application_submission_date, application_response_data
         FROM applications
         WHERE user_id = $1`,
        [user_id],
      );
      const application = result.rows[0];
  
      if (!application) throw new NotFoundError(`No application: ${user_id}`);
  
      return application;
    }
  
    static async update(user_id, data) {
      const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          grant_id: "grant_id",
          application_status: "application_status",
          application_submission_date: "application_submission_date",
          application_response_data: "application_response_data"
        });
      const appIDVarIdx = "$" + (values.length + 1);
  
      const querySql = `UPDATE applications 
                        SET ${setCols} 
                        WHERE user_id = ${appIDVarIdx} 
                        RETURNING user_id, grant_id, application_status, application_submission_date, application_response_data`;
      const result = await db.query(querySql, [...values, user_id]);
      const application = result.rows[0];
  
      if (!application) throw new NotFoundError(`No application: ${user_id}`);
  
      return application;
    }
  
    static async remove(user_id) {
      const result = await db.query(
        `DELETE
         FROM applications
         WHERE user_id = $1
         RETURNING user_id`,
        [user_id]);
      const application = result.rows[0];
  
      if (!application) throw new NotFoundError(`No application: ${user_id}`);
    }
}

module.exports = Application;
