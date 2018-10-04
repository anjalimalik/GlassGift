const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool();

async function execute(query, values) {
	const result = await pool.query(query, values);
	return result.rows;
}

async function retrieve(table, names, values){
	var queryString = `SELECT * FROM ${table} WHERE `;
	for (var i = 0; i < (names.length > values.length? values.length: names.length); i++) {
		if(i == 0){
			queryString += `${names[i]} = ${values[i]}`;
		}else{
			queryString += ` AND ${names[i]} = ${values[i]}`;
		}
	}
	return await execute(queryString);
}

async function init() {
    return await execute(fs.readFileSync('./init.database', 'utf-8'));
}

async function get(table, cols, query) {
	return await execute(`SELECT ${cols.join(', ')} FROM ${table} WHERE ${query}`);
}

async function insert(table, cols, vals) {
	if (cols.length !== vals.length) throw "Different number of columns and values";
	return await execute(`INSERT INTO TABLE ${table} (${cols.join(", ")}) VALUES (${vals.join(", ")})`);
}

async function modify(table, property, value, qualifier) {
	return await execute(`UPDATE ${table} SET ${property}=${value} WHERE ${qualifier}`);
}

module.exports = {insert, modify, init, retrieve};