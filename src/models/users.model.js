const db = require("../helpers/db.helper")

exports.getAllUser = (id, callback) => {
    const sql = 'SELECT * FROM "users" WHERE id=$1';
    const value = [id]
    db.query(sql, value, callback);
}

exports.getUserByEmail = (email, callback) => {
    const sql = `SELECT id,email,username,is_active,password FROM "users" WHERE "email" = $1`
    const value = [email]
    db.query(sql, value, callback)
}

exports.createUser = (data, callback = () => {}) => {
    const sql = `INSERT INTO "users" (username, email, password, user_code) VALUES ($1, $2, $3, $4) RETURNING id, email, user_code`
    const value =[data.username, data.email, data.password, data.userCode]
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
    const sql = `SELECT id,email,username,is_active FROM "users" WHERE "refresh_token" = $1`
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
    db.query(sql, callback) ;

}