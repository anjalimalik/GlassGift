const db = require('.');
const uuidv4 = require("uuid/v4");

function getLimitsById(id) {
    return db.get('NGO', ['minLimit', 'maxLimit'], `id = '${id}'`);
}

function create() {

}

function searchByName(keyword) {
    return db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
        ['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice',
            'minLimit', 'maxLimit'], `name LIKE \'%${keyword}%\'`);
}

function searchByLocation(keyword) {
    return db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
        ['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice',
            'minLimit', 'maxLimit'], `location LIKE \'%${keyword}%\'`);
}

function searchByCategory(keyword) {
    return db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
        ['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice',
            'minLimit', 'maxLimit'], `category = \'${keyword}\'`);
}

module.exports = {getLimitsById, create, searchByName, searchByCategory, searchByLocation};