//! 1C2-2-Router
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {  //* qua /list thì mở tập tin video-list
  res.send('list video');
});

router.get('/add', function(req, res, next) {
  res.send('add video');
});

router.get('/edit', function(req, res, next) {
  res.send('edit video');
});

module.exports = router;
