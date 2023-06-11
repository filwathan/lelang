const auctionPostRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')

const {createAuctionPost} = require('../controllers/auctionPost.controller');

auctionPostRouter.post('/auctionPost', verifyToken, createAuctionPost);
// auctionPostRouter.post('/', createAuctionPost);
// auctionPostRouter.patch('/:id', updateCategories);
// auctionPostRouter.patch('/delete/:id', deleteCategories);

module.exports = auctionPostRouter;