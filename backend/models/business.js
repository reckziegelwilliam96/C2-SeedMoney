"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Business {
  static async create({ business_name, business_address, tax_id }) {
    const result = await db.query(
      `INSERT INTO businesses (business_name, business_address, tax_id)
       VALUES ($1, $2, $3)
       RETURNING business_name, business_address, tax_id`,
      [business_name, business_address, tax_id],
    );

    return result.rows[0];
  }

  static async get(tax_id) {
    const result = await db.query(
      `SELECT business_name, business_address, tax_id
       FROM businesses
       WHERE tax_id = $1`,
      [tax_id],
    );
    const business = result.rows[0];

    if (!business) throw new NotFoundError(`No business: ${tax_id}`);

    return business;
  }

  static async update(tax_id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        business_name: "business_name",
        business_address: "business_address"
      });
    const taxIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE businesses 
                      SET ${setCols} 
                      WHERE tax_id = ${taxIDVarIdx} 
                      RETURNING business_name, business_address, tax_id`;
    const result = await db.query(querySql, [...values, tax_id]);
    const business = result.rows[0];

    if (!business) throw new NotFoundError(`No business: ${tax_id}`);

    return business;
  }

  static async remove(tax_id) {
    const result = await db.query(
      `DELETE
       FROM businesses
       WHERE tax_id = $1
       RETURNING tax_id`,
      [tax_id]);
    const business = result.rows[0];

    if (!business) throw new NotFoundError(`No business: ${tax_id}`);
  }
}

module.exports = Business;
