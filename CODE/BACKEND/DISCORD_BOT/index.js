const { Client, Intents } = require("discord.js");
const db = require("./db/index");
const Jobs = require("./jobs/Jobs");
const { init: initQueue } = require("./jobs/queue");
require("./web/server");
const config = require("./config.json");
const { admins } = require("./config.json");
const { loadCommands } = require("./utils");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { commands, aliases } = loadCommands("commands");

console.log("run once");

client.commands = commands;
client.aliases = aliases;

client.on("ready", () => {
	console.log("Bot is ready...");
	db.connect();
	initQueue();
});

client.on("messageCreate", (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const messageSplit = message.content.substr(config.prefix.length, message.content.length).split(/\s+/g);
	const cmd = messageSplit[0];
	const args = messageSplit.slice(1);

	try {
		let command;
		if (client.commands.has(cmd)) {
			command = client.commands.get(cmd);
		} else if (client.aliases.has(cmd)) {
			command = client.commands.get(client.aliases.get(cmd));
		} else return;
		if ((command.isAdmin && admins.includes(message.author.id)) || !command.isAdmin) {
			command.execute(client, message, args);
		}
	} catch (err) {
		console.error(err);
	}
});

client.login(config.token);

const serverCommands = {
	status: (msg) => {
		client.user.setActivity(msg, { type: "PLAYING" });
	},
	"set-balance": async (userId, balance) => {
		try {
			const result = await db.database.User.findAll({
				where: {
					discordID: userId,
				},
			});

			if (result.length == 0) {
				// Create user data
				await db.database.User.create({
					discordID: userId,
					cash: parseInt(balance),
					bank: parseInt(balance),
				});
			} else {
				await db.database.User.update(
					{
						cash: parseInt(balance),
						bank: parseInt(balance),
					},
					{
						where: {
							discordID: userId,
						},
					}
				);
			}
		} catch (error) {
			console.log(error);
		}
	},
};

Jobs.EE.on("do", (command, ...args) => {
	if (command in serverCommands) {
		serverCommands[command](...args);
	}
});
