const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

exports.refreshToken = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401);

        userModel.getRefreshToken(refreshToken, async (err, {rows})=>{        
            if(err) return res.sendStatus(403)

            const [user] = rows
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
                if(error) return res.sendStatus(403)

                const accessToken = jwt.sign({
                    id: user.id, 
                    userCode:user.user_code,
                    username:user.username, 
                    fullName:user.full_name,
                    profilePicture:user.profile_picture,
                    email: user.email, 
                    is_active: user.is_active,
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '90000s'
                })

                res.json({accessToken})
            })

        })
    }catch (error) {
        console.log('error when verify token', error)
    }
}