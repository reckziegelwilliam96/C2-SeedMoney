"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Grant {
      static async create(data) {
        const result = await db.query(
            `INSERT INTO grants (grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id`, 
            [data.grant_name, data.application_window, data.programDescription, data.applicantEligibility, data.eligibleArea, data.useOfFunds, data.grantTerms, data.gettingStarted, data.contactInformation, data.governingLaw, data.program_id]
        );
        let newGrant = result.rows[0];
        
        return new Grant(newGrant.id, newGrant.grant_name, newGrant.application_window, newGrant.program_description, newGrant.applicant_eligibility, newGrant.eligible_area, newGrant.use_of_funds, newGrant.grant_terms, newGrant.getting_started, newGrant.contact_information, newGrant.governing_law, newGrant.program_id);
    }

    static async getAll() {
      const result = await db.query(
        `SELECT id, grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id
         FROM grants`
      );
      return result.rows;
    }
  
    static async get(grantID) {
        const result = await db.query(
          `SELECT id, grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id
           FROM grants
           WHERE id = $1`,
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