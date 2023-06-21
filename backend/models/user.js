"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /** authenticate user with email, password. */
static async authenticate(email, password) {
  const result = await db.query(
        `SELECT id,
                email,
                password,
                first_name,
                last_name
         FROM users
         WHERE email = $1`,
      [email],
  );

  const user = result.rows[0];

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid === true) {
      delete user.password;
      return user;
    }
  }

  throw new UnauthorizedError("Invalid email/password");
}

/** Register user with data. */
static async register({ first_name, last_name, email, password }) {
  const duplicateCheck = await db.query(
        `SELECT email,
                password,
                first_name,
                last_name
         FROM users
         WHERE email = $1`,
      [email],
  );

  if (duplicateCheck.rows[0]) {
    throw new BadRequestError(`Duplicate email: ${email}`);
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  const result = await db.query(
        `INSERT INTO users
         (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING id, first_name, last_name, email`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
      ],
  );

  const user = result.rows[0];

  return user;
}

/** Find all users. */
static async findAll() {
  const result = await db.query(
        `SELECT first_name AS "firstName",
                last_name AS "lastName",
                email
         FROM users
         ORDER BY email`,
  );

  return result.rows;
}


  static async get(id) {
    const result = await db.query(
      `SELECT users.id, first_name, last_name, email
              businesses.name AS business_name,
              JSON_AGG(farms) AS farms
       FROM users
       JOIN businesses ON businesses.user_id = users.id
       LEFT JOIN farms ON farms.business_id = businesses.id
       WHERE users.id = $1
       GROUP BY users.id, businesses.name`,
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
        password: "password"
      });
    const userIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${userIDVarIdx} 
                      RETURNING id, first_name, last_name, email`;
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

  // new function to get the business associated with a user
  static async getBusiness(userId) {
    const result = await db.query(
      `SELECT b.*
       FROM businesses AS b
       JOIN users AS u ON u.id = b.user_id
       WHERE u.id = $1`,
      [userId],
    );
    const business = result.rows[0];

    if (!business) throw new NotFoundError(`No business associated with user: ${userId}`);

    return business;
  }

}

module.exports = User;
