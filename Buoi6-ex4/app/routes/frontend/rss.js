var express = require('express');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();


const folderView	 = __path_views_blog + 'pages/rss/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET about page. */
router.get('/', async (req, res, next) => {
	
	let feed	= [];
	feed = await parser.parseURL('https://vnexpress.net/rss/the-thao.rss');
	items = feed.items;

// 	feed.items.forEach(item => {
// 		console.log(item.title);
// });
	//console.log(feed.items[0]);
	res.render(`${folderView}index`, {
		layout: layoutBlog,
		top_post: false,
		items,
		feed
	});
});

module.exports = router;
