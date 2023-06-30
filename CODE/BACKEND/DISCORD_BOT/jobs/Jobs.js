const { EventEmitter } = require("events");

module.exports = class Jobs {
	static EE = new EventEmitter();

	static executeJob(command, ...args) {
		this.EE.emit("do", command, ...args);
	}
};
