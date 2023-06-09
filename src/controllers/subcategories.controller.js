const subCategoriesModel = require('../models/subcategories.model')
const jwt = require("jsonwebtoken");

exports.getAllSubCategories = (req, res) => {
    subCategoriesModel.getAllSubCategories((err, data) =>{
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

exports.getSubCategoriesByCategoryCode = (req, res) => {
    console.log("code", req.params.categoryCode)
    subCategoriesModel.getSubCategoriesByCategoryCode(req.params.categoryCode, (err, data) =>{
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

exports.createSubCategories = (req, res) => {

}

exports.updateSubCategories = (req, res) => {

}

exports.deleteSubCategories = (req, res) => {

}