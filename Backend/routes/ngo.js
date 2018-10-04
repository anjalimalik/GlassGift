const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const ngo = req.body;
    const hash = await bcrypt(ngo.password, saltRounds);
    
    await db.insert("GGUser",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [ngo.email, hash, ngo.location, ngo.emailConfirmation, ngo.confirmed]);
    await db.insert("Donor",
        ["emailTemplate", "description", "calLink", "notice", "minLimit", "maxLimit"],
        [ngo.emailTemplate, ngo.description, ngo.calLink, ngo.notice, ngo.minLimit, ngo.maxLimit]);
    res.status(200);
});

router.put('/notice', async function(req, res) {
    await db.modify('NGO', 'notice', req.body.notice, `id = ${req.body.id}`);
    res.status(200);
});

module.exports = router;
