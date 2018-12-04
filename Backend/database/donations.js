const db = require(".");
const uuidv4 = require('uuid/v4');

function getById(id) {
    return db.get('Donation', ['*'], `id = '${id}'`);
}

function create(id, donorId, ngoId, anonymous, message, type, honoredUserId, honoredUserName, created, amount) {
    return db.insert('Donation',
        ['id', 'donorId', 'ngoId', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created', 'amount'],
        [id, donorId, ngoId, anonymous || false, message || "", type || 0, honoredUserId || 0, honoredUserName || "",
            created || `NOW()`, amount || 0]);
}

function createScheduled(donationId, frequency) {
    return db.insert('RecurringDonation',
        ['id', 'donationId', 'updated', 'frequency'],
        [uuidv4(), donationId, new Date().toString(), frequency]);
}

function getByNgo(id) {
    return db.get('donation', ['*'], `ngoId = '${id}'`);
}

function getByDonor(id) {
    return db.get('donation', ['*'], `donorId = '${id}'`);
}

module.exports = {create, createScheduled, getById, getByNgo, getByDonor};