const db = require("../helpers/db.helper");


exports.getAllSubCategories = (callback) => {
    const sql = `SELECT "id", "sub_category_code", "sub_category_name", "sub_category_desc", "category_code", "parent_code" FROM "categories_sub" WHERE "is_deleted" = 0 AND "is_active"=1 ORDER BY "sub_category_name" ASC`;
    db.query(sql, callback) ;
}
exports.getSubCategoriesByCategoryCode = (categoryCode, callback) => {
    const sql = `SELECT "id", "sub_category_code", "sub_category_name", "sub_category_desc", "category_code", parent_code FROM "categories_sub" WHERE "is_deleted" = 0 AND "is_active"=1 AND "category_code" = $1 ORDER BY "sub_category_name" ASC`;
    const value = [categoryCode]
    db.query(sql, value, callback);
}

exports.createSubCategories = (data, callback) => {
    const sql = `INSERT INTO "categories_sub" ("category_code", "category_name", "category_desc") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const value = [data.categoryCode, data.categoryName, data.categoryDesc];
    db.query(sql, value, callback) 
}