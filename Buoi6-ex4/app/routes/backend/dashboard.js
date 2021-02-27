var express = require('express');
var router = express.Router();

const folderView	 = __path_views_admin + 'pages/dashboard/';

const ItemsModel 	= require(__path_schemas + 'items');
const GroupsModel 	= require(__path_schemas + 'groups');
const UsersModel 	= require(__path_schemas + 'users');
const CategoryModel = require(__path_schemas + 'categories');
const ArticleModel 	= require(__path_schemas + 'articles');

const countItemHelpers 	= require(__path_helpers + 'count-items');

/* GET dashboard page. */
router.get('/', async(req, res, next) => {
	let totalItems = 0;
	totalItems = await countItemHelpers.countItems2(ItemsModel);
	let totalGroups = 0;
  	totalGroups = await countItemHelpers.countItems2(GroupsModel);
  	let totalUsers = 0;
	totalUsers = await countItemHelpers.countItems2(UsersModel);
  	let totalCategories = 0;
	totalCategories = await countItemHelpers.countItems2(CategoryModel);
	let totalArticles = 0;
	totalArticles = await countItemHelpers.countItems2(ArticleModel);


	res.render(`${folderView}index`, { 
		pageTitle: 'Dashboard Page', 
		totalItems,
    	totalGroups,
    	totalUsers,
    	totalCategories,
		totalArticles
	});
});

module.exports = router;
