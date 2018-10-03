const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', function (req, res) {
	const ngo = req.body;

	const query = client.query(`INSERT INTO TABLE Donation (
            donorId, ngoId, anonymity, message, donationType, honoredUserId, honoredUerName, date 
        ) VALUES (
            
        )`);
});

router.post('/notices/new', function (req, res) {

});

module.exports = router;