//! 1C2-2-Router
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.render('items/list', { title: 'ItemPage list' });
});

router.get('/add', function(req, res, next) {
  res.render('items/add', { title: 'Item AddPage' });
});

module.exports = router;