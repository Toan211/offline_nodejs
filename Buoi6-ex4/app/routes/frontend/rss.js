var express = require('express');
var router = express.Router();

let RSSParser = require('rss-parser');
let RssParser = new RSSParser();

const UrlHelpers = require(__path_helpers + 'url-helper');

const folderView	 = __path_views_blog + 'pages/rss/';
const layoutBlog    = __path_views_blog + 'frontend';


/* GET about page. */
router.get('/', async (req, res, next) => {
	
	let feed	= [];
	let GoldItems= [];
	

	feed = await RssParser.parseURL('https://vnexpress.net/rss/the-thao.rss');
	items = feed.items;

	let GoldXML = 'https://www.sjc.com.vn/xml/tygiavang.xml';
	await UrlHelpers.xmlToJson(GoldXML, (err, data) => {
		if(err){
			return console.err(err);
		}
		GoldItems = data.root.ratelist[0].city[0].item;

		res.render(`${folderView}index`, {
			layout: layoutBlog,
			top_post: false,
			silde_bar: false,
			items,
			GoldItems
		});
	});
	
// 	feed.items.forEach(item => {
// 		console.log(item.title);
// });
	//console.log(feed.items[0]);
	
});

module.exports = router;
