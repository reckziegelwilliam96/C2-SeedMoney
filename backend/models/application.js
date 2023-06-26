"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Application {
  static async create({ user_id, grant_id, farm_name, farm_location, farm_size, farm_revenue, crops_grown, animals_raised, app_proposal }) {
    const app_status = 'Pending Response';
    const app_submission_date = new Date().toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
    const app_response_date = null; // The application hasn't been responded yet.
  
    const result = await db.query(
      `INSERT INTO applications (user_id, grant_id, farm_name, farm_location, farm_size, farm_revenue, crops_grown, animals_raised, app_proposal, app_status, app_submission_date, app_response_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING user_id, grant_id, farm_name, farm_size, farm_revenue, crops_grown, animals_raised, app_proposal, app_status, app_submission_date, app_response_date`,
      [user_id, grant_id, farm_name, farm_location, farm_size, farm_revenue, crops_grown, animals_raised, app_proposal, app_status, app_submission_date, app_response_date],
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

    static async getAll(user_id) {
      const result = await db.query(
        `SELECT a.user_id, a.grant_id, a.farm_name, a.farm_location, a.farm_size, a.farm_revenue, a.crops_grown, a.animals_raised, a.app_proposal, a.app_status, a.app_submission_date, a.app_response_date,
                g.grant_name, g.application_window, g.program_description
         FROM applications AS a
         JOIN grants AS g ON a.grant_id = g.id
         WHERE a.user_id = $1`,
        [user_id],
      );
    
      const applications = result.rows;
    
      if (!applications) throw new NotFoundError(`No application: ${user_id}`);
    
      return applications;
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
