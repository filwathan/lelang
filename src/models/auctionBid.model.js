const db = require("../helpers/db.helper");

exports.bidAuction = (data, callback) => {
    console.log('datasss', data)
    const sql = `INSERT INTO "auction_bid" 
        ("bid_price", 
        "auction_participant_no", 
        "created_at",
        "created_by"
        ) VALUES (
            $1, $2, $3, $4)
        RETURNING *`;
    const value = [
        data.bidPrice,
        data.auctionParticipantNo,
        data.createdAt,
        data.createdBy
    ];
    db.query(sql, value, callback) 
    // db.query(sql, value, function (err, result) {
    //     if(result) {
    //         callback(null, result);
    //     }else{
    //         console.log('error here')
    //         callback(true, {});
    //     }
    // })
}
