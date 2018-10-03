const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const donor = req.body;
    const hash = await bcrypt(donor.password, saltRounds);
    
    await db.insert("GGUser",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [donor.email, hash, donor.location, donor.emailConfirmation, donor.confirmed]);
    await db.insert("Donor",
        ["paymentData", "age", "gender"],
        [donor.paymentData, donor.age, donor.gender]);
        
    res.status(200);
});

module.exports = router;
