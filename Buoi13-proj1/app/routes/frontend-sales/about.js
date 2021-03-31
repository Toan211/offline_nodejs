var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');

const folderView	 = __path_views_sales + 'pages/about/';
const layoutBlog    = __path_views_sales + 'frontend';

/* GET about page. */
router.get('/', async (req, res, next) => {

	let params 		 	 = ParamsHelpers.createParam(req);
	
	res.render(`${folderView}index`, {
		layout: layoutBlog,
		top_post: false,
		silde_bar: true,
		params
	});
});

module.exports = router;
