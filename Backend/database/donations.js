const db = require(".");
const uuidv4 = require('uuid/v4');

function getById(id) {
    return db.get('Donation', ['*'], `id = '${id}'`);
}

function create(id, donorId, ngoId, anonymous, message, type, honoredUserId, honoredUserName, created, amount) {
    return db.insert('Donation',
        ['id', 'donorId', 'ngoId', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created', 'amount'],
        [id, donorId, ngoId, anonymous || false, message || "", type || 0, honoredUserId || 0, honoredUserName || "",
            created || `to_timestamp(${Date.now() / 1000})`, amount || 0]);
}

function createScheduled(donationId, frequency) {
    return db.insert('RecurringDonation',
        ['id', 'donationId', 'updated', 'frequency'],
        [uuidv4(), donationId, new Date().toString(), frequency]);
}

module.exports = {create, createScheduled, getById};