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
        `SELECT email,
                password,
                first_name,
                last_name
         FROM users
         WHERE id = $1`,
      [id],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    return user;
  }

  static async update(id, data) {

    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

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

  /** Fetches the list of businesses of a user by the user's id */
  static async getUserBusinesses(userId) {
    const result = await db.query(
      `SELECT b.id, b.business_name, b.business_address, b.tax_id
       FROM businesses AS b
       JOIN users AS u ON u.id = b.user_id
       WHERE u.id = $1`,
      [userId]
    );
    
    console.log('getUserBusinesses result:', result.rows);

    if (result.rows.length === 0) throw new NotFoundError(`No businesses found for user: ${userId}`);
    return result.rows;
  }

  /** Fetches the detail of a business of a user by the user's id and business id */
  static async getUserBusiness(userId, businessId) {
    const result = await db.query(
      `SELECT b.id, b.business_name, b.business_address, b.tax_id
       FROM businesses AS b
       JOIN users AS u ON u.id = b.user_id
       WHERE u.id = $1 AND b.id = $2`,
      [userId, businessId]
    );

    if (result.rows.length === 0) throw new NotFoundError(`No business: ${businessId} found for user: ${userId}`);
    return result.rows[0];
  }

  /** Fetches the list of farms of a user by the user's id */
  static async getUserFarms(userId) {
    const result = await db.query(
      `SELECT f.id, f.size, f.years_of_experience, f.types_of_crops, f.organic_certification, f.sustainability_practices, f.annual_farm_revenue, 
      f.profitability, f.farm_address, f.farm_city, f.farm_state, f.farm_zip_code, f.filing_status, f.tax_forms_filed, f.previous_application, f.grant_outcome
       FROM farms AS f
       JOIN businesses AS b ON f.business_id = b.id
       JOIN users AS u ON b.user_id = u.id
       WHERE u.id = $1`,
      [userId]
    );

    console.log('getUserFarms result:', result.rows);

    if (result.rows.length === 0) throw new NotFoundError(`No farms found for user: ${userId}`);
    return result.rows;
  }

  /** Fetches the detail of a farm of a user by the user's id and farm id */
  static async getUserFarm(userId, farmId) {
    const result = await db.query(
      `SELECT f.id, f.size, f.years_of_experience, f.types_of_crops, f.organic_certification, f.sustainability_practices, f.annual_farm_revenue, 
      f.profitability, f.farm_address, f.farm_city, f.farm_state, f.farm_zip_code, f.filing_status, f.tax_forms_filed, f.previous_application, f.grant_outcome
       FROM farms AS f
       JOIN businesses AS b ON f.business_id = b.id
       JOIN users AS u ON b.user_id = u.id
       WHERE u.id = $1 AND f.id = $2`,
      [userId, farmId]
    );

    if (result.rows.length === 0) throw new NotFoundError(`No farm: ${farmId} found for user: ${userId}`);
    return result.rows[0];
  }

  /** Fetches the list of applications of a user by the user's id */
  static async getApplications(userId) {
    const result = await db.query(
      `SELECT a.id, a.app_proposal, a.app_status, a.app_submission_date, a.app_response_date
       FROM applications AS a
       JOIN users AS u ON u.id = a.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) throw new NotFoundError(`No applications found for user: ${userId}`);
    return result.rows;
  }

  static async getUserApplications(user_id) {
    const result = await db.query(
      `SELECT a.id, a.user_id, a.grant_id, a.farm_name, a.farm_location, a.farm_size, a.farm_revenue, a.crops_grown, a.animals_raised, a.app_proposal, a.app_status, a.app_submission_date, a.app_response_date,
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

}

module.exports = User;
