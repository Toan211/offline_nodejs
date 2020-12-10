var express = require('express');
var router = express.Router();


const ItemsModel 	= require(__path_schemas + 'items');
const folderView	 = __path_views + 'pages/dashboard/';

var totalItems = 0;



/* GET dashboard page. */
router.get('/', async (req, res, next) => {
	//console.log(ItemsModel);
    await ItemsModel.count({}, function( err, count){
      totalItems = count;
    });
  res.render(`${folderView}index`, { 
    pageTitle: 'Dashboard Page', 
    'courseName': '<p>NodeJS</p>',
    totalItems
  });
});

module.exports = router;







module.exports = router;