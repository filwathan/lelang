const categoriesModel = require('../models/categories.model')
const subCategoriesModel = require('../models/subcategories.model')
const jwt = require("jsonwebtoken");

exports.getCategoriesSubCategories = (req, res) => {
    categoriesModel.getAllCategories((err, data) =>{
        if (err){
            return res.status(401).json({
                success: false,
                message: 'something wrong'
            })
        }else{
            subCategoriesModel.getAllSubCategories((err, dataSub) =>{
                if(!err){
                    
                    let valList = []
                    let detailList = {};

                    for (var i=0; i<data.rows.length; i++){
                        let valSubList = []
                        let detailSubList = {};

                        for (var x=0; x<dataSub.rows.length; x++){
                            if(data.rows[i].category_code === dataSub.rows[x].category_code && dataSub.rows[x].parent_code == null){

                                let valSubSubList = []
                                let detailSubSubList = {};

                                for (var y=0; y<dataSub.rows.length; y++){
                                    if(data.rows[i].category_code === dataSub.rows[y].category_code && dataSub.rows[y].parent_code != null){
                                        detailSubSubList = {
                                            id                  : dataSub.rows[y].id,
                                            categoryCode        : dataSub.rows[y].category_code,
                                            subCategoryCode     : dataSub.rows[y].sub_category_code,
                                            subCategoryName     : dataSub.rows[y].sub_category_name,
                                            subCategoryDesc     : dataSub.rows[y].sub_category_desc,
                                            parentCode         : dataSub.rows[y].parent_code
                                        }
        
                                        valSubSubList.push(detailSubSubList)
                                    }
                                }
                                detailSubList = {
                                    id                  : dataSub.rows[x].id,
                                    categoryCode        : dataSub.rows[x].category_code,
                                    subCategoryCode     : dataSub.rows[x].sub_category_code,
                                    subCategoryName     : dataSub.rows[x].sub_category_name,
                                    subCategoryDesc     : dataSub.rows[x].sub_category_desc,
                                    parentCode          : dataSub.rows[x].parent_code,
                                    details             : valSubSubList
                                }

                                valSubList.push(detailSubList)
                            }
                        }

                        detailList = {
                            id              : data.rows[i].id,
                            categoryCode    : data.rows[i].category_code,
                            categoryName    : data.rows[i].category_name,
                            categoryDesc    : data.rows[i].category_desc,
                            details         : valSubList
                        }
                        
                        valList.push(detailList)

                    }

                    return res.status(200).json({
                        success: true,
                        message: 'get all categoris and sub categories',
                        results: valList
                    })
                }else{
                    return res.status(401).json({
                        success: false,
                        message: 'something wrong'
                    })
                }
            
            })
        }
    })
}

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