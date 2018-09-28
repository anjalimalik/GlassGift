var express = require('express');
var router = express.Router();
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
    const ngo = req.body;

    const client = new pg.Client(connection)
	client.connect();
	 const query = client.query(`INSERT INTO TABLE UserIps (
            userId, IPaddress
        ) VALUES (
            
        )`);
    
    query.on("end", client.end());
	const 
});

router.post('/notices/new', function(req, res) {
    
});

module.exports = router;