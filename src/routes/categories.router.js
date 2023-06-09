const categoriesRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')

const {getAllCategories, createCategories, updateCategories, deleteCategories} = require('../controllers/categories.controller');

categoriesRouter.get('/', getAllCategories);
categoriesRouter.post('/', createCategories);
categoriesRouter.patch('/:id', updateCategories);
categoriesRouter.patch('/delete/:id', deleteCategories);

module.exports = categoriesRouter;