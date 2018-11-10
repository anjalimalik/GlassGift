const db = require('.');

function getEmailsFromId(id) {
    return db.get('GGUser', ['email'] , `id = '${id}'`);
}

function confirmById(id) {
    return db.modify('GGUser', 'confirmed', 'true', `id = '${id}'`);
}

function setResetPasswordToken(email, token) {
    return db.modify('GGUser', ['resetPasswordToken'], [token], `email = '${email}'`);
}

function getByResetPasswordToken(token) {
    return db.get('GGUser', ['*'], `resetPasswordToken = '${token}'`);
}

function getByEmailConfirmationToken(token) {
    return db.get('GGUser', ['*'], `emailConfirmation = '${token}'`);
}

function changePassword(id, newPasswordHash) {
    return db.modify('GGUser', 'password', newPasswordHash, `id = '${id}'`);
}

function getByEmail(email) {
    return db.get('GGUser', ['*'], `email = '${email}'`);
}

function getIpsById(id) {
    return db.get('UserIps', ['ip'], `userId = '${id}'`);
}

function addNewIp(id, ip) {
    return db.insert('UserIps', ['userId', 'ip'], id, ip);
}

module.exports = {getEmailsFromId, confirmById, changePassword, getByResetPasswordToken, setResetPasswordToken,
getByEmailConfirmationToken, getByEmail, getIpsById, addNewIp};