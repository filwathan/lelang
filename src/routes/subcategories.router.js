const subCategoriesRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')

const {getAllSubCategories, createSubCategories, updateSubCategories, deleteSubCategories, getSubCategoriesByCategoryCode, getCategoriesSubCategories} = require('../controllers/subcategories.controller');

subCategoriesRouter.get('/', getAllSubCategories);
subCategoriesRouter.get('/categoriesSubCategories', getCategoriesSubCategories);

subCategoriesRouter.get('/:categoryCode', getSubCategoriesByCategoryCode);

subCategoriesRouter.post('/', createSubCategories);
subCategoriesRouter.patch('/:id', updateSubCategories);
subCategoriesRouter.patch('/delete/:id', deleteSubCategories);

module.exports = subCategoriesRouter;