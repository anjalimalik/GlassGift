const db = require('.');
const uuidv4 = require("uuid/v4");

function getLimitsById(id) {
    return db.get('NGO', ['minLimit', 'maxLimit'], `id = '${id}'`);
}

async function create(email, password, username, location, emailConfirmationToken, description, category, calLink,
                      minLimit, maxLimit) {
    const id = uuidv4();

    await db.insert('GGUser', ['id', 'email', 'password', 'username', 'location', 'emailConfirmation', 'confirmed'],
        [id, email, password, username, location, emailConfirmationToken, 'false']);
    await db.insert('NGO', ['id', 'description', 'category', 'calLink', 'minLimit', 'maxLimit'],
        [id, description, category, calLink, minLimit || 0, maxLimit || 0]);
}

async function edit(id, location, description, category, calendarLink, minLimit, maxLimit) {
    await db.modify('GGUser', 'location', changes.location, `id = '${id}'`);
    await db.modify('NGO', ['description', 'category', 'calLink', 'minLimit', 'maxLimit'],
        [description, category, calendarLink, minLimit || 0, maxLimit || 0],
        `id = '${id}'`);
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

function getIdsByEmail(email) {
    return db.get('GGUser', ['id'], `email = '${email}'`);
}

function getById(id) {
    return db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
        ['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice', 'minLimit',
            'maxLimit'],
        `NGO.id = '${id}'`);
}

function setNotice(id, notice) {
    return db.modify('NGO', 'notice', notice, `id = '${id}'`);
}

function setMinLimit(id, limit) {
    return db.modify('NGO', 'minLimit', limit, `id = '${id}'`);
}

function setMaxLimit(id, limit) {
    return db.modify('NGO', 'maxLimit', limit, `id = '${id}'`);
}

function createNewsletter(id, newsletter) {
    return db.insert('newsletters',
        ['id', 'ngoId', 'newsletter', 'created'],
        [uuidv4(), id, newsletter, `to_timestamp(${Date.now() / 1000})`]);
}

function getNewsletter(id) {
    return db.get('newsletters', ['newsletter'], `ngoId = '${id}'`);
}

function getSubscribers(id) {
    return db.get('subscriptions', ['donorId'], `ngoId = '${id}'`);
}

module.exports = {getLimitsById, create, searchByName, searchByCategory, searchByLocation, getIdsByEmail, edit, getById,
setNotice, setMaxLimit, setMinLimit, createNewsletter, getSubscribers, getNewsletter};