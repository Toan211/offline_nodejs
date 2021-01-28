var express = require('express');
var router = express.Router();

const middleGetCategoryForMenu  = require(__path_middleware + 'get-category-for-menu');
const middleArticleRandom       = require(__path_middleware + 'get-article-random');

router.use('/', middleGetCategoryForMenu ,middleArticleRandom, require('./home'));
router.use('/category', require('./category'));
router.use('/article', require('./article'));
router.use('/about', require('./about'));
router.use('/contact', require('./contact'));
router.use('/rss', require('./rss'));

module.exports = router;