const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config.json");
const db = {};
const sq = new Sequelize(config.postgress_url || process.env["DATABASE_URL"], {
	dialect: "postgres",
});

// Reads all models and puts them into Object
fs.readdirSync(path.join(__dirname, "/models")).forEach((file) => {
	const model = require(path.join(__dirname, `/models/${file}`))(sq, Sequelize.DataTypes);
	db[model.name] = model;
});

// Defines associates
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sq;

class Database {
	static database = db;
	static connected = false;

	static async connect() {
		try {
			await this.database.sequelize.sync();
			this.connected = true;
			console.log("DB Connected!");
		} catch (err) {
			console.error(`[DB] ${err.message}`);
		}
	}
}

module.exports = Database;
