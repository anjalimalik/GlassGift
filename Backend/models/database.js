const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool();

async function execute(query, values) {
	const result = await pool.query(query, values);
	return result.rows;
}

async function init() {
    return await execute(fs.readFileSync('../sql/tables.sql'));
}

async function insert(table, cols, vals) {
	if (cols.length !== vals.length) throw "Different number of columns and values";
	return await execute(`INSERT INTO TABLE ${table} (${cols.join(", ")}) VALUES (${vals.join(", ")})`);
}

async function modify(table, property, value, qualifier) {
	return await execute(`UPDATE ${table} SET ${property}=${value} WHERE ${qualifier}`);
}

module.exports = {execute, insert, modify, init};