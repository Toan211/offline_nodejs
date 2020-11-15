//! 1C2-3-view
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.render('items/list', { title: 'Item List Page'}); //* qua /list thì mở tập tin video-list
});

router.get('/add', function(req, res, next) {
  res.render('items/add', { title: 'Item add List Page'}); //* chọn file ejs để tải lên
});

router.get('/edit', function(req, res, next) {
  res.send('edit video');                         //* in ra màn hình
});

module.exports = router;
