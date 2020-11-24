var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/publish/index', { pageTitle: 'publishHome' });  //*index is in view folder
});



module.exports = router;

