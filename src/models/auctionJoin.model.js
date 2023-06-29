const db = require("../helpers/db.helper");

exports.createAuctionParticipant = (data, callback) => {
    const sql = `INSERT INTO "auction_participants" 
        ("participant_no", 
        "auction_post_code", 
        "created_at",
        "created_by"
        ) VALUES (
            $1, $2, $3, $4)
        RETURNING *`;
    const value = [
        data.participantNo,
        data.auctionPostCode,
        data.createdAt,
        data.createdBy
    ];
    db.query(sql, value, callback) 
}

exports.getParticipantNo = (callback) => {
    const sql = `select participant_no from auction_participants order by id desc limit 1`
    // console.log(callback)
    db.query(sql, callback) ;

}