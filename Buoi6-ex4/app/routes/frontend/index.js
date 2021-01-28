var express = require('express');
var router = express.Router();

const middleGetCategoryForMenu  = require(__path_middleware + 'get-category-for-menu');

router.use('/', middleGetCategoryForMenu , require('./home'));
router.use('/category', require('./category'));
router.use('/post', require('./post'));
router.use('/about', require('./about'));
router.use('/contact', require('./contact'));

module.exports = router;