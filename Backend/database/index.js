const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool({
	user: 'glassgift',
	password: 'glassgift',
	database: 'glassgift'
});

async function execute(query) {
	const result = await pool.query(query);
	return result.rows;
}

function init() {
    execute(fs.readFileSync(__dirname + '/init.sql', 'utf-8').replace(/\n/g, ''))
	    .then(() => console.log("Database initialized"))
	    .catch((e) => console.error(e, "Something went wrong in database initialization :("));
}

async function get(table, cols, query) {
	if (query) return await execute(`SELECT ${cols.join(', ')} FROM ${table} WHERE ${query}`);
	else return await execute(`SELECT ${cols.join(', ')} FROM ${table}`);
}

async function insert(table, cols, values) {
	if (cols.length !== values.length) throw "Different number of columns and values";
	return await execute(`INSERT INTO ${table}(${cols.join(", ")}) VALUES (${values.map(c => `'${c}'`).join(", ")})`);
}

async function modify(table, props, values, qualifier) {
	const deltas = Array.isArray(props) ? props.map((p, i) => `${p} = '${values[i]}'`) : `${props} = '${values}'`;
	return await execute(`UPDATE ${table} SET ${deltas.join(', ')} WHERE ${qualifier}`);
}

module.exports = {get, insert, modify, init};
