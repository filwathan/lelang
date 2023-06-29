const auctionPostRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')
const uploadMiddleware = require('../middleware/upload.middleware')

const {createAuctionPost} = require('../controllers/auctionPost.controller');
const {joinAuction} = require('../controllers/auctionJoin.controller');

auctionPostRouter.post('/auctionPost', verifyToken, uploadMiddleware, createAuctionPost);
// auctionPostRouter.post('/', createAuctionPost);
// auctionPostRouter.patch('/:id', updateCategories);
// auctionPostRouter.patch('/delete/:id', deleteCategories);

auctionPostRouter.post('/joinAuction', verifyToken, joinAuction);

module.exports = auctionPostRouter;