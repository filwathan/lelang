const auctionPostModel = require('../models/auctionPost.model')
const jwt = require("jsonwebtoken");

exports.createAuctionPost = async (req, res) => {
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
            


            auctionPostModel.getAuctionPostCode((err, {rows}) =>{
                let [code] = rows
                if(!err && code !== undefined){
                    let getCode = generateId(code.auction_post_code)

                    const data = {
                        auctionPostCode: getCode,
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
                        console.log('err when create auction');
                        if(!err){
                            return res.status(200).json({
                                succes: true,
                                message: 'Create Auction is Success',
                                results: 'Berhasil'
                            })
                        }else{
                            console.log('Email already', err)
                            return res.status(401).json({
                                false: true,
                                message: 'Create Auction is Failed',
                            })
                        }

                    })
                }else{
                    return res.status(401).json({
                        false: true,
                        message: 'Something wrong when post auction',
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

function generateId(id) {
    let finalId = ''

    if (!id) {
        let alpha_series = "APC";
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