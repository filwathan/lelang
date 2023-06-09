const routes = require('express').Router();

routes.use('/users', require('./users.router'));
routes.use('/auth', require('./auth.router'));
routes.use('/categories', require('./categories.router'));
routes.use('/subCategories', require('./subcategories.router'));
routes.use('/auction', require('./auctionPost.router'));


module.exports = routes