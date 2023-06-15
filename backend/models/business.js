"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Business {
    static async create({ business_name, business_address, tax_id, user_id }) {
        const result = await db.query(
          `INSERT INTO businesses (business_name, business_address, tax_id, user_id)
           VALUES ($1, $2, $3, $4)
           RETURNING business_name, business_address, tax_id, user_id`,
          [business_name, business_address, tax_id, user_id],
        );

        return result.rows[0];
      }

    static async get(id) {
      const result = await db.query(
        `SELECT business_name, business_address, tax_id
         FROM businesses
         WHERE id = $1`,
        [id],
      );

      const business = result.rows[0];  
      if (!business) throw new NotFoundError(`No business: ${id}`); 
      return business;
    }   

    static async update(id, data) {
      const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          business_name: "business_name",
          business_address: "business_address",
          tax_id: "tax_id"
        });
      const IDVarIdx = "$" + (values.length + 1);    
      const querySql = `UPDATE businesses 
                        SET ${setCols} 
                        WHERE id = ${IDVarIdx} 
                        RETURNING business_name, business_address, tax_id`;

      const result = await db.query(querySql, [...values, id]);

      const business = result.rows[0];  
      if (!business) throw new NotFoundError(`No business: ${id}`); 
      return business;
    }

    static async remove(id) {
        const result = await db.query(
          `DELETE
           FROM businesses
           WHERE id = $1
           RETURNING id`,
          [id]);
        const business = result.rows[0];

        if (!business) throw new NotFoundError(`No business: ${id}`);
    }

    static async getFarms(id) {
        const result = await db.query(
          `SELECT f.*
           FROM farms AS f
           WHERE f.business_id = $1`,
          [id],
        );
        const farms = result.rows;
        
        if (!farms) throw new NotFoundError(`No farms associated with business: ${id}`);
        
        return farms;
    }

    static async getUser(id) {
      const result = await db.query(
        `SELECT u.*
         FROM users AS u
         WHERE u.business_id = $1`,
        [id],
      );
      const user = result.rows[0];

      if (!user) throw new NotFoundError(`No user associated with business: ${id}`);

      return user;
    }
    
}

module.exports = Business;
