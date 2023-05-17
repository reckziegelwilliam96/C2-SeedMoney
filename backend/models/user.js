"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class User {
  static async create({ userID, name, email, password, accountCreationDate, lastLoginDate }) {
    // Hash and salt password before storing it
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    
    const result = await db.query(
      `INSERT INTO users (userID, name, email, password, accountCreationDate, lastLoginDate)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING userID, name, email, password, accountCreationDate, lastLoginDate`,
      [userID, name, email, hashedPassword, accountCreationDate, lastLoginDate],
    );

    return result.rows[0];
  }

  static async get(userID) {
    const result = await db.query(
      `SELECT userID, name, email, password, accountCreationDate, lastLoginDate
       FROM users
       WHERE userID = $1`,
      [userID],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${userID}`);

    return user;
  }

  static async update(userID, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        name: "name",
        email: "email",
        password: "password",
        accountCreationDate: "accountCreationDate",
        lastLoginDate: "lastLoginDate",
      });
    const userIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE userID = ${userIDVarIdx} 
                      RETURNING userID, name, email, password, accountCreationDate, lastLoginDate`;
    const result = await db.query(querySql, [...values, userID]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${userID}`);

    return user;
  }

  static async remove(userID) {
    const result = await db.query(
      `DELETE
       FROM users
       WHERE userID = $1
       RETURNING userID`,
      [userID]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${userID}`);
  }
}

// Repeat a similar process for the Farm, Grant, and Applications tables.
// Note: For the Farm and Applications tables, the create() method should also take a userID parameter, 
//       and the Applications table's create() method should additionally take a grantID parameter.
//       The Grant table's create() method should include all the relevant grant details.

module.exports = User;
