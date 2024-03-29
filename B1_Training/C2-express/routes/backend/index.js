var express = require('express');   //*express is a framework, provide us many useful thing
const { route } = require('../frontend');
var router = express.Router();


/* GET home page. */
router.use('/', require('./home'));   
router.use('/dashboard', require('../backend/dashboard'));
router.use('/items', require('../backend/items'));

module.exports = router;