const db = require("../helpers/db.helper")

exports.getAllUser = (callback) => {
    const sql = 'SELECT * FROM "users"';
    db.query(sql, callback);
}

exports.getUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM "users" WHERE "email" = $1`
    const value = [email]
    db.query(sql, value, callback)
}

exports.createUser = (data, callback) => {
    const sql = `INSERT INTO "users" ("email", "password", "phone") VALUES ($1, $2, $3) RETURNING *`
    const value =[data.email, data.password, data.phone]
    db.query(sql, value, callback)
}