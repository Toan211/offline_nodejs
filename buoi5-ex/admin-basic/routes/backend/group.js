var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();


router.get('/form', function(req, res, next) {
  res.render('pages/group/form', { pageTitle: 'group form page' });  //*index is in view folder
});

router.get('/list', function(req, res, next) {
    res.render('pages/group/list', { pageTitle: 'group list page' });  //*index is in view folder
  });

  router.get('/', function(req, res, next) {
    res.render('pages/group/list', { pageTitle: 'group list page' });  //*index is in view folder
  });  

module.exports = router;
