const db = require("../helpers/db.helper");

exports.createAuctionPost = (data, callback) => {
    const sql = `INSERT INTO "auction_post" 
        ("auction_post_code", 
        "title", 
        "sub_category_code",
        "images",
        "videos",
        "condition",
        "initial_price",
        "multiple_price",
        "description",
        "status",
        "start_date",
        "end_date",
        "tags",
        "created_by"
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
        RETURNING *`;
    const value = [
        data.auctionPostCode, 
        data.title, 
        data.subCategoryCode,
        data.images,
        data.videos,
        data.condition,
        data.initialPrice,
        data.multiplePrice,
        data.description,
        data.status,
        data.startDate,
        data.endDate,
        data.tags,
        data.createdBy
    ];
    db.query(sql, value, callback) 
}