const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../models/database');

const router = express.Router();
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res) {
    const ngo = req.body;
    const hash = await bcrypt(ngo.password, saltRounds);
    
    db.insert("User",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [ngo.email, hash, ngo.location, ngo.emailConfirmation, ngo.confirmed]);
    db.insert("Donor", 
        ["emailTemplate", "description", "calLink", "notice", "minLimit", "maxLimit"],
        [ngo.emailTemplate, ngo.description, ngo.calLink, ngo.notice, ngo.minLimit, ngo.maxLimit]);
});

router.put('/notice', async function(req, res) {
    db.modify('NGO', 'notice', req.body.notice, `id = ${req.body.id}`);
    res.status(200);
});

module.exports = router;
