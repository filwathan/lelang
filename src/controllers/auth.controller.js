const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    userModel.getUserByEmail(req.body.email, (err, {rows})=>{        
        if(rows.length){ 
            const [user] = rows
            if(req.body.password === user.password){
                const token = jwt.sign({id: user.id}, process.env.BACKEND_SECRET)
                return res.status(200).json({
                    succes: true,
                    message: 'Login Success',
                    results: {token}
                })
            }
            else {
                return res.status(401).json({
                    succes: false,
                    message: 'email or password wrong',
                })
            }
        }
        else{
            return res.status(401).json({
                succes: false,
                message: 'email or password wrong',
            })
        }
    })
}

exports.register = (req, res) => {
    if(req.body.email && req.body.password && req.body.phone){
        userModel.createUser(req.body, (err, {rows}) =>{
            const user = rows
            const token = jwt.sign({id: user.id}, process.env.BACKEND_SECRET)
            return res.status(200).json({
                succes: true,
                message: 'Create New Account is Success',
                results: {token}
            })
        })
    }
    else{
        return res.status(401).json({
            succes: false,
            message: 'failed create new account'
        })
    }
}