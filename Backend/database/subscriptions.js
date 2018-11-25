const db = require('.');

function create(donorId, ngoId) {
    return db.insert('Subscriptions', ['donorId', 'ngoId'], [donorId, ngoId]);
}

module.exports = {create};