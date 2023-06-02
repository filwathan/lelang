const {Pool} = require('pg')

require("dotenv").config();

const db = new Pool({
    // connectionString: "postgresql://postgres:1@localhost:5432/pengen_nonton?schema=public"
    connectionString: process.env.DATABASE
})

db.connect((err) =>{
    if(err){
        console.log('db cant connect')
    }
    else{
        console.log('db can connect to')
    }
})

module.exports = db