"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Program {
    // Create a new program
    static async create(data) {
        const result = await db.query(
            `INSERT INTO programs (title, link, description) VALUES ($1, $2, $3) RETURNING *`, 
            [data.title, data.link, data.description]
        );

        let program = result.rows[0];

        if (!program) throw new NotFoundError(`No program: ${data.title}`);
        
        return program;
    }
    
    // Get all programs
    static async getAll() {
        const result = await db.query(`SELECT * FROM programs`);
        return result.rows;
      }

    // Get a specific program by ID
    static async get(programID) {
        const result = await db.query(
            `SELECT * 
            FROM programs
            WHERE id = $1`,
            [programID],
        );
        const program = result.rows[0];
    
        if (!program) throw new NotFoundError(`No program: ${programID}`);
    
        return program;
    }
    // Update a specific program by ID
    static async update(programID, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                title: "title",
                link: "link",
                description: "description"
            });
        const programIDVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE programs 
                        SET ${setCols} 
                        WHERE id = ${programIDVarIdx} 
                        RETURNING *`;
        const result = await db.query(querySql, [...values, programID]);
        const program = result.rows[0];
    
        if (!program) throw new NotFoundError(`No program: ${programID}`);
    
        return program;
    }
    // Delete a specific program by ID
    static async remove(programID) {
        const result = await db.query(
          `DELETE
           FROM programs
           WHERE id = $1
           RETURNING id`,
          [programID]);
        const program = result.rows[0];
    
        if (!program) throw new NotFoundError(`No program: ${programID}`);
    }
}

module.exports = Program;
