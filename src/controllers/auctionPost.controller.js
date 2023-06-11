const auctionPostModel = require('../models/auctionPost.model')
const jwt = require("jsonwebtoken");

exports.createAuctionPost = async (req, res) => {
    // console.log(req.username)
    // console.log(req.body)
    try{
        if( req.username &&
            req.body.title && 
            req.body.subCategoryCode &&
            // req.body.images &&
            req.body.condition &&
            req.body.initialPrice &&
            req.body.multiplePrice &&
            req.body.description
            // req.body.startDate &&
            // req.body.endDate 
            ){
                
            // console.log(req.body)
            const data = {
                auctionPostCode: null,
                title: req.body.title, 
                subCategoryCode: req.body.subCategoryCode,
                images: req.body.images,
                videos: req.body.videos,
                condition: req.body.condition,
                initialPrice: req.body.initialPrice,
                multiplePrice: req.body.multiplePrice,
                description: req.body.description,
                status: req.body.status,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                tags: req.body.tags,
                createdBy: req.username
            }

            auctionPostModel.createAuctionPost( data, (err, callback) =>{
                console.log("callback", callback)
                console.log(err);
                if(!err){
                    return res.status(200).json({
                        succes: true,
                        message: 'Create New Account is Success',
                        results: 'Berhasil'
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
    }catch(e){
        console.log("error", e)
    }
}