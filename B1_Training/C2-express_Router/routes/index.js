var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomePage'});  //*index is in view folder
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'HomePage'});  
});

module.exports = router;
