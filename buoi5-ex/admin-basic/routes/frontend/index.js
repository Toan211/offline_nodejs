var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


/* GET home page. */
router.use('/', require('./dashboard'));   



module.exports = router;
