var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


router.get('/form', function(req, res, next) {
  res.render('pages/user/form', { pageTitle: 'user form page' });  //*index is in view folder
});

router.get('/list', function(req, res, next) {
    res.render('pages/user/list', { pageTitle: 'user list page' });  //*index is in view folder
  });

  router.get('/', function(req, res, next) {
    res.render('pages/user/list', { pageTitle: 'user list page' });  //*index is in view folder
  });  

module.exports = router;
