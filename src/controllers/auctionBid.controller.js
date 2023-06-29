const auctionBidModel = require('../models/auctionBid.model')
const jwt = require("jsonwebtoken");

exports.bidAuction = async (req, res) => {
    
    try{
        if( req.body.bidPrice 
            && req.body.auctionParticipantNo 
            // &&
            // req.body.createdAt
        ){
            const data = {
                bidPrice: req.body.bidPrice,
                auctionParticipantNo: req.body.auctionParticipantNo,
                createdAt: req.body.createdAt,
                createdBy: req.username
                
            }

            console.log('data', data)

            auctionBidModel.bidAuction( data, (err, callback) =>{
                // console.log('callback', callback)
                if(!err){
                    return res.status(200).json({
                        succes: true,
                        message: 'Bid Successfully',
                        results: 'Berhasil'
                    })
                }else{
                    return res.status(401).json({
                        false: true,
                        message: 'Bid Failed',
                    })
                }

            })
                

        }
        else{
            return res.status(401).json({
                succes: false,
                message: 'failed (Bid auction)'
            })
        }
    }catch(e){
        console.log("error", e)
    }
}
