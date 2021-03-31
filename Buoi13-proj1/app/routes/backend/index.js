var express = require('express');
var router = express.Router();

const middleAuthentication = require(__path_middleware + 'auth');
const userInfo  	= require(__path_middleware + 'get-user-info');

router.use('/', middleAuthentication ,userInfo , require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/categories', require('./categories'));
router.use('/rss', require('./rss'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/articles', require('./articles'));
router.use('/products', require('./products'));
router.use('/types', require('./types'));
router.use('/contact', require('./contact'));


module.exports = router;
