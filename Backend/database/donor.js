const db = require('.');
const uuidv4 = require("uuid/v4");

function search(keyword) {
    return db.get('GGUser INNER JOIN Donor ON GGUser.id = Donor.id', ['Donor.id as id', 'username', 'email'],
        `name LIKE \'%${keyword}%\'`);
}

async function create(email, password, username, location, emailConfirmation, age, gender) {
    const id = uuidv4();
    await db.insert('GGUser', ['id', 'email', 'password', 'username', 'location', 'emailConfirmation', 'confirmed'],
        [id, email, password, username, location, emailConfirmation, false]);
    await db.insert('Donor', ['id', 'age', 'gender'], [id, age || 0, gender || ""]);
}

function addPaymentInfo(id, address, number, cvv, expirationDate, name) {
    return db.insert('PaymentInfo',
        ['userId', 'address', 'ccNumber', 'cvv', 'expirationDate', 'ccName'],
        [id, address, number, cvv, expirationDate, name]);
}

module.exports = {search, create, addPaymentInfo};