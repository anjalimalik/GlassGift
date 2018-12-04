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

async function getByEmail(email) {
    const users = await db.get('GGUser', ['*'], `email = '${email}'`);
    const types = await db.execute(`SELECT 
        CASE
            WHEN EXISTS(SELECT id FROM donor WHERE id = '${users[0].id}')
            THEN 0
            ELSE 1
        END
        FROM gguser WHERE email = '${email}'`);
    return Object.assign({}, users[0], {
        type: types[0].case
    });
}

function getIpsById(id) {
    return db.get('UserIps', ['ip'], `userId = '${id}'`);
}

function addNewIp(id, ip) {
    return db.insert('UserIps', ['userId', 'ip'], id, ip);
}

module.exports = {getEmailsFromId, confirmById, changePassword, getByResetPasswordToken, setResetPasswordToken,
getByEmailConfirmationToken, getByEmail, getIpsById, addNewIp};