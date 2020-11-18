var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('pages/dashboard/index', { pageTitle: 'Dashboard page' });  //*index is in view folder
});

module.exports = router;
