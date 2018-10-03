const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../sql/database');

const router = express.Router();
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res) {
    const donor = req.body;
    const hash = await bcrypt(donor.password, saltRounds);
    
    db.insert("User",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [donor.email, hash, donor.location, donor.emailConfirmation, donor.confirmed]);
    db.insert("Donor", 
        ["paymentData", "age", "gender"],
        [donor.paymentData, donor.age, donor.gender]);
        
    res.status(200);
});

module.exports = router;
