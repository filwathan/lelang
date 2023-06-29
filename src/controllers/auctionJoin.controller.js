const auctionJoinModel = require('../models/auctionJoin.model')
const jwt = require("jsonwebtoken");

exports.joinAuction = async (req, res) => {
    
    try{
        if( req.body.auctionPostCode 
            // &&
            // req.body.createdAt
            ){
                

            auctionJoinModel.getParticipantNo((err, {rows}) =>{
                        console.log("err2", err)
                        console.log("rows", rows)
                if(!err){
                    let [code] = rows
                    let getCode
                    if(rows.length > 0){
                        getCode = generateId(code.participant_no)
                    }else{
                        getCode = generateId('')
                    }

                    const data = {
                        participantNo: getCode,
                        auctionPostCode: req.body.auctionPostCode, 
                        createdAt: req.body.createdAt,
                        createdBy: req.username
                        
                    }

                    auctionJoinModel.createAuctionParticipant( data, (err, callback) =>{
                        console.log("callback", callback)
                        console.log("err", err)

                        if(!err){
                            return res.status(200).json({
                                succes: true,
                                message: 'Join Auction is Success',
                                results: 'Berhasil'
                            })
                        }else{
                            return res.status(401).json({
                                false: true,
                                message: 'Join Auction is Failed',
                            })
                        }

                    })
                }else{
                    return res.status(401).json({
                        false: true,
                        message: 'Something wrong when join auction',
                    })
                }

            })
        }
        else{
            return res.status(401).json({
                succes: false,
                message: 'failed (join auction)'
            })
        }
    }catch(e){
        console.log("error", e)
    }
}

function generateId(id = '') {
    let finalId = ''

    if (!id) {
        let alpha_series = "JA";
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