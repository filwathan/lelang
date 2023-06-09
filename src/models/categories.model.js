const db = require("../helpers/db.helper");


exports.getAllCategories = (callback) => {
    const sql = `SELECT "id", "category_code", "category_name", "category_desc" FROM "categories" WHERE "is_deleted" = 0 ORDER BY "category_name" ASC`;
    db.query(sql, callback) ;
}

exports.createCategories = (data, callback) => {
    const sql = `INSERT INTO "categories" ("category_code", "category_name", "category_desc") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const value = [data.categoryCode, data.categoryName, data.categoryDesc];
    db.query(sql, value, callback) 
}