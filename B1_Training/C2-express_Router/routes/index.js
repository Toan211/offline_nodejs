var express = require('express');   //*express is a framework, provide us many useful thing
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("ABCABC123");
  res.render('index', { title: 'Express 123123' });  //*index is in view folder
});

module.exports = router;
