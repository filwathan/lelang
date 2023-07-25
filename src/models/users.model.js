const db = require("../helpers/db.helper")

exports.getAllUser = (id, callback) => {
    const sql = 'SELECT * FROM "users" WHERE id=$1';
    const value = [id]
    db.query(sql, value, callback);
}

exports.getUserByEmail = (email, callback) => {
    const sql = `SELECT id,user_code,username,full_name,profile_picture,email,password,is_active FROM "users" WHERE "email" = $1`
    const value = [email]
    db.query(sql, value, callback)
}

exports.createUser = (data, callback = () => {}) => {
    const sql = `INSERT INTO "users" (user_code, username, full_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_code, username, full_name, profile_picture, email, is_active`
    const value =[data.userCode, data.username, data.fullName, data.email, data.password]
    db.query(sql, value, function (err, result) {
        if(result) {
            callback(null, result);
        }else{
            console.log('error here')
            callback(true, {});
        }
       
    })
}

exports.updateRefreshTokenUser = (dataRefreshToken, callback) => {
    console.log('data model', dataRefreshToken)
    const sql = `UPDATE users SET refresh_token=$1 WHERE id=$2`
    const value = [dataRefreshToken.refresh_token, dataRefreshToken.id]
    db.query(sql, value, callback)
}

exports.getRefreshToken = (token, callback) => {
    const sql = `SELECT id, user_code, username, full_name, profile_picture, email, is_active FROM "users" WHERE "refresh_token" = $1`
    const value = [token]
    db.query(sql, value, callback)
}

exports.deleteRefreshToken = (id, callback) => {
    const sql = `UPDATE users SET refresh_token= NULL WHERE id=$1`
    const value = [id]
    db.query(sql, value, callback)
} 

exports.getUserCode = (callback) => {
    const sql = `select user_code from users order by id desc limit 1`
    // console.log(callback)
    db.query(sql, callback)

}