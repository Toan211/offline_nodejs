var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


/* GET home page. */
router.use('/', require('./dashboard'));   
router.use('/group', require('./group')); 
router.use('/book', require('./book')); 
router.use('/category', require('./category')); 
router.use('/user', require('./user'));

module.exports = router;
