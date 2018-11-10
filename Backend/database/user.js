const db = require('.');

function getEmailsFromId(id) {
    return db.get('GGUser', ['email'] , `id = '${id}'`);
}

module.exports = {getEmailsFromId};