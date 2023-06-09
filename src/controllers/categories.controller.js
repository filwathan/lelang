const categoriesModel = require('../models/categories.model')
const jwt = require("jsonwebtoken");

exports.getAllCategories = (req, res) => {
    // const token = (req.headers.authorization).split(" ")[1]
    // console.log("token cat " , token)

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
    //     console.log(decoded) // bar
    //   });



    categoriesModel.getAllCategories((err, data) =>{
        if (err){
            return res.status(401).json({
                success: false,
                message: 'something wrong'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'you get all categoris',
                results: data.rows
            })
        }
    })

}

exports.createCategories = (req, res) => {

}

exports.updateCategories = (req, res) => {

}

exports.deleteCategories = (req, res) => {

}