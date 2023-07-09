const auctionPostRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')
const uploadMiddleware = require('../middleware/upload.middleware')

const {createAuctionPost, listAllAuctionPost} = require('../controllers/auctionPost.controller');
const {joinAuction} = require('../controllers/auctionJoin.controller');
const {bidAuction} = require('../controllers/auctionBid.controller');


auctionPostRouter.get('/getLissAllAuctionPost', verifyToken, listAllAuctionPost);
auctionPostRouter.post('/auctionPost', verifyToken, uploadMiddleware, createAuctionPost);
// auctionPostRouter.post('/', createAuctionPost);
// auctionPostRouter.patch('/:id', updateCategories);
// auctionPostRouter.patch('/delete/:id', deleteCategories);

auctionPostRouter.post('/joinAuction', verifyToken, joinAuction);
auctionPostRouter.post('/bidAuction', verifyToken, bidAuction);


module.exports = auctionPostRouter;