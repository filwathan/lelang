const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { json } = require('body-parser')

exports.register = async (req, res) => {
    if(req.body.email && req.body.password){
        //generate username
        const username = req.body.email.split("@");


        //generate password
        const salt = await bcrypt.genSalt()
        const hashPasssword = await bcrypt.hash(req.body.password, salt)
        const data = {
            email: req.body.email,
            username: username[0],
            password: hashPasssword
        }

        userModel.createUser( data, (err, {rows}) =>{
            console.log(err)
            if(!err){
                const user = rows
                const token = jwt.sign(
                    {
                        email: user.email, 
                        username:user.username, 
                        is_active: user.is_active
                    }, 
                    process.env.ACCESS_TOKEN_SECRET)
                
                return res.status(200).json({
                    succes: true,
                    message: 'Create New Account is Success',
                    results: {token}
                })
            }else{
                return res.status(401).json({
                    false: true,
                    message: 'Email already registered',
                })
            }

        })
    }
    else{
        return res.status(401).json({
            succes: false,
            message: 'failed create new account'
        })
    }
}

exports.login = (req, res) => {

    userModel.getUserByEmail(req.body.email, async (err, {rows})=>{        
        if(rows.length){ 
            const [user] = rows
            
            const matchPassword = await bcrypt.compare(req.body.password, user.password)
            console.log("match", matchPassword)
            if(matchPassword){
                const accessToken = jwt.sign(
                    {
                        id: user.id, 
                        email: user.email, 
                        username:user.username, 
                        is_active: user.is_active
                    }, 
                    process.env.ACCESS_TOKEN_SECRET, 
                    {
                        expiresIn: '30s'
                    })

                const refreshToken = jwt.sign(
                    {
                        id: user.id, 
                        email: user.email, 
                        username:user.username, 
                        is_active: user.is_active
                    }, 
                    process.env.REFRESH_TOKEN_SECRET, 
                    {
                        expiresIn: '1d'
                    })
                const dataRefreshToken = {
                    id: parseInt(user.id),
                    refresh_token: refreshToken
                }

                // console.log(dataRefreshToken)

                userModel.updateRefreshTokenUser(dataRefreshToken, (err, result) => {})

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                return res.status(200).json({
                    succes: true,
                    message: 'Login Success',
                    results: {accessToken}
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

exports.logout = (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401);

        userModel.getRefreshToken(refreshToken, (err, {rows})=>{        
            if(err) return res.sendStatus(204)

            const [user] = rows
            userModel.deleteRefreshToken(user.id, (err2, {rows})=>{
                if(err2) return res.sendStatus(204)
                
                res.clearCookie('refreshToken')
                return res.sendStatus(200)
            }) 

        })
    }catch (error) {
        console.log('error when logout', error)
    }
}

