const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool();

async function execute(query) {
	const result = await pool.query(query);
	return result.rows;
}

function init() {
    execute(fs.readFileSync('./database/init.sql', 'utf-8'))
	    .then(() => console.log("Database initialized"));
}

async function get(table, cols, query) {
	if (query) return await execute(`SELECT ${cols.join(', ')} FROM ${table} WHERE ${query}`);
	else return await execute(`SELECT ${cols.join(', ')} FROM ${table}`);
}

async function insert(table, cols, values) {
	if (cols.length !== values.length) throw "Different number of columns and values";
	return await execute(`INSERT INTO ${table}(${cols.join(", ")}) VALUES (${values.join(", ")})`);
}

async function modify(table, props, values, qualifier) {
	const deltas = Array.isArray(props) ? props.map((p, i) => `${p} = '${values[i]}'`) : `${props} = '${values}'`;
	return await execute(`UPDATE ${table} SET ${deltas.join(', ')} WHERE ${qualifier}`);
}

module.exports = {get, insert, modify, init};
