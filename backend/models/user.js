"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class User {
  static async create({ id, first_name, last_name, email, password, business_id }) {
    const result = await db.query(
      `INSERT INTO users (id, first_name, last_name, email, password, business_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, first_name, last_name, email, business_id`,
      [id, first_name, last_name, email, password, business_id],
    );

    return result.rows[0];
  }

  static async get(id) {
    const result = await db.query(
      `SELECT id, first_name, last_name, email, business_id
       FROM users
       WHERE id = $1`,
      [id],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    return user;
  }

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        first_name: "first_name",
        last_name: "last_name",
        email: "email",
        password: "password",
        business_id: "business_id",
      });
    const userIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${userIDVarIdx} 
                      RETURNING id, first_name, last_name, email, business_id`;
    const result = await db.query(querySql, [...values, id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    return user;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM users
       WHERE id = $1
       RETURNING id`,
      [id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);
  }
}

module.exports = User;
