import mysql, { Connection } from "mysql2/promise";

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const dbase = process.env.DB_BASE;


export async function initDataBase(): Promise<Connection | null> {
	let connection: Connection | null = null;

	try {
		connection = await mysql.createConnection({
			host: host,
			port: port,
			password: password,
			user: user,
			database: dbase,
		})
	} catch (e) {
		console.error(e.message || e);
		return null;
	}

	console.log(`Connection to DB ProductsApplication established`);
	return connection;
}