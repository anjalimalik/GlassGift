var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
    
});

router.post('/notices/new', function(req, res) {
    
});

module.exports = router;
