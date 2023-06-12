"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Farm {
  static async create({ size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id }) {
    const result = await db.query(
      `INSERT INTO farms (size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id`,
      [size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id],
    );

    return result.rows[0];
  }

  static async get(business_id) {
    const result = await db.query(
      `SELECT size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id
       FROM farms
       WHERE business_id = $1`,
      [business_id],
    );
    const farm = result.rows[0];

    if (!farm) throw new NotFoundError(`No farm: ${business_id}`);

    return farm;
  }

  static async update(business_id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        size: "size",
        years_of_experience: "years_of_experience",
        types_of_crops: "types_of_crops",
        organic_certification: "organic_certification",
        sustainability_practices: "sustainability_practices", 
        annual_farm_revenue: "annual_farm_revenue",
        profitability: "profitability",
        farm_address: "farm_address",
        farm_city: "farm_city",
        farm_state: "farm_state", 
        farm_zip_code: "farm_zip_code",
        filing_status: "filing_status", 
        previous_application: "previous_application",
        grant_outcome: "grant_outcome"
      });
    const businessIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE farms 
                      SET ${setCols} 
                      WHERE business_id = ${businessIDVarIdx} 
                      RETURNING size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id`;
    const result = await db.query(querySql, [...values, business_id]);
    const farm = result.rows[0];

    if (!farm) throw new NotFoundError(`No farm: ${business_id}`);

    return farm;
  }

  static async remove(business_id) {
    const result = await db.query(
      `DELETE
       FROM farms
       WHERE business_id = $1
       RETURNING business_id`,
      [business_id]);
    const farm = result.rows[0];

    if (!farm) throw new NotFoundError(`No farm: ${business_id}`);
  }
}

module.exports = Farm;
