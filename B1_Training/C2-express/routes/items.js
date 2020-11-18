//! 1C2-2-Router
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/items/list', { pageTitle: 'ItemPage list' });
});

router.get('/add', function(req, res, next) {
  res.render('pages/items/add', { pageTitle: 'Item AddPage' });
});

module.exports = router;
