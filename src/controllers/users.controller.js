const modelUsers = require('../models/users.model')

exports.getAllUser = (req, res) => {

    modelUsers.getAllUser(req.id, (err, data) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: 'error from model'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'you get all user',
                results: data.rows
            })
        }
    }) 
}