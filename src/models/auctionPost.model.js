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

exports.getAuctionPostCode = (callback) => {
    const sql = `select auction_post_code from auction_post order by id desc limit 1`
    // console.log(callback)
    db.query(sql, callback) ;

}

exports.getCountAuctionPostCode = (filter, callback) =>{
    const sql = `SELECT COUNT("title") AS "totalData" FROM "auction_post" WHERE "title" LIKE $1`
    const value = [`%${filter.search}%`]
    db.query(sql, value, callback)
}

exports.getAllAuctionPostCode = (filter, callback) => {
    const sql = `SELECT "auction_post_code", 
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
    FROM "auction_post" 
    WHERE "title" LIKE $3
    ORDER BY "title" ${filter.sort}
    LIMIT $1
    OFFSET $2`
    const value = [filter.limit, filter.offset, `%${filter.search}%`]
    db.query(sql,value, callback)
}