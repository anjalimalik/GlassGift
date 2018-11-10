const db = require('.');
const uuidv4 = require("uuid/v4");

function search(keyword) {
    return db.get('GGUser INNER JOIN Donor ON GGUser.id = Donor.id', ['Donor.id as id', 'username', 'email'],
        `name LIKE \'%${keyword}%\'`);
}

function create() {

}

module.exports = {search, create};