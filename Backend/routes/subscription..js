const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
	const donor = req.body;

	const query = client.query(`INSERT INTO TABLE DonorSubscriptions (
            donorId, ngoId
        ) VALUES (
            
        )`);
});

module.exports = router;
