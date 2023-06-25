const auctionPostModel = require('../models/auctionPost.model')
const jwt = require("jsonwebtoken");

exports.createAuctionPost = async (req, res) => {
    console.log('======================================')
    console.log(req.body)
    // console.log('hit controller req.file', req.file)
    // console.log('hit controller req.files', req.files)
    // req.body.images = req.files
    // req.body.videos = req.file
    // console.log( 'req.body',req.body)
    // console.log( 'req.username',req.username)
    // if(req.file){
    //     req.body.images = req.file.filename
    // }
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
                status: req.body.status || null,
                startDate: req.body.startDate || null,
                endDate: req.body.endDate || null,
                tags: req.body.tags,
                createdBy: req.username
            }

            auctionPostModel.createAuctionPost( data, (err, callback) =>{
                // console.log("callback", callback)
                // console.log(err);
                if(!err){
                    return res.status(200).json({
                        succes: true,
                        message: 'Create New Account is Success',
                        results: 'Berhasil'
                    })
                }else{
                    console.log('Email already', err)
                    return res.status(401).json({
                        false: true,
                        message: 'Email already registered',
                    })
                }

            })
        }
        else{
            console.log('failed create, cant empety username, title, subCategoryCode, condition, initialPrice, multiplePrice, description')
            return res.status(401).json({
                succes: false,
                message: 'failed create new account'
            })
        }
    }catch(e){
        console.log("error", e)
    }
}