var express = require('express');
const pg = require('pg');
var router = express.Router();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
    const donor = req.body;

client.connect();
    const client = new pg.Client(connectionString);
    const query = client.query(`INSERT INTO TABLE Donor (
            paymentData, age, gender
        ) VALUES (
            
        )`);
    
    query.on("end", client.end());
});

module.exports = router;
