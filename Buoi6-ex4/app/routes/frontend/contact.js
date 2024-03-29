var express = require('express');
var router = express.Router();

const folderView	 = __path_views_blog + 'pages/contact/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET contact page. */
router.get('/', async (req, res, next) => {
	
	res.render(`${folderView}index`, {
		layout: layoutBlog,
		top_post: false,
		silde_bar: true
	});
});

module.exports = router;
