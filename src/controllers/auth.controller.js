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

        userModel.getUserCode((err, {rows}) =>{
            let [user] = rows
            if(!err && user !== undefined){
                let getId = generateId(user.user_code)
                const data = {
                    email: req.body.email,
                    username: username[0],
                    password: hashPasssword,
                    userCode: getId
                }

                userModel.createUser( data, (err, {rows}) =>{
                    console.log(err)
                    if(!err){
                        const user = rows
                        const token = jwt.sign(
                            {
                                email: user.email, 
                                username:user.username, 
                                userCode:user.user_code,
                                is_active: user.is_active,
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
                            message: 'Email already registered, please contact administrator',
                        })
                    }
    
                })
            }else{
                return res.status(401).json({
                    false: true,
                    message: 'Something wrong when registration',
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
                        expiresIn: '1d'
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

function generateId(id) {
    let finalId = ''

    if (!id) {
        let alpha_series = "USR";
        let year_now = new Date().getFullYear().toString();
        year_now = year_now.slice(-2);
        let month_now = new Date().getMonth() + 1;
        month_now = month_now < 10 ? "0" + month_now : month_now;
        let incrementer = "00001";
        finalId = alpha_series + year_now + month_now + incrementer;
    } else {
        let alpha_series = id.slice(0, 3);
        let year_id = id.slice(3, 5);
        let year_now = new Date().getFullYear().toString();
        year_now = year_now.slice(-2);
        year_id = year_id == year_now ? year_id : year_now;
        let month_id = id.slice(5, 7);
        let month_now = new Date().getMonth() + 1;
        month_now = month_now < 10 ? "0" + month_now : month_now;
        let final_month_id = month_id == month_now ? month_id : month_now;
        let lastIdIncrement = parseInt(id.slice(-5));
        let incrementer = addLeadingZeros((lastIdIncrement + 1).toString());
        incrementer = month_id == month_now ? incrementer : "00001";
        finalId = alpha_series + year_id + final_month_id + incrementer;
    }
    //insert the id in db.
    return finalId;
}

function addLeadingZeros(id) {
    if (id.length < 4) {
        var noneZeroEcode = Number(id).toString();
        var pad = "00000";
        var id = pad.substring(0, pad.length - noneZeroEcode.length) + noneZeroEcode;
        return id;
    } else {
        return id;
    }
}
