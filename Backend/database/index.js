const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool();

async function execute(query, values) {
	const result = await pool.query(query, values);
	return result.rows;
}

async function directQuery(query) {
    return await execute(directQuery);
}

function init() {
    execute(fs.readFileSync('./database/init.sql', 'utf-8'))
	    .then(() => console.log("Database initialized"));
}

async function get(table, cols, query) {
	return await execute(`SELECT ${cols.join(', ')} FROM ${table} WHERE ${query}`);
}

async function insert(table, cols, vals) {
	if (cols.length !== vals.length) throw "Different number of columns and values";
	return await execute(`INSERT INTO ${table} (${cols.join(", ")}) VALUES (${vals.join(", ")})`);
}

async function modify(table, property, value, qualifier) {
	return await execute(`UPDATE ${table} SET ${property}=${value} WHERE ${qualifier}`);
}

module.exports = {pool, get, insert, modify, init, directQuery};
