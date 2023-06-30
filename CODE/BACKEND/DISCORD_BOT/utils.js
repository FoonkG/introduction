const { Collection } = require("discord.js");
const path = require("path");
const glob = require("glob");

const getAllCommands = (commandDirectoryPath = "commands") => {
	const commandArray = [];
	commandArray.push(...glob.sync(`${path.join(__dirname, commandDirectoryPath)}/**/*.js`));
	return commandArray;
};

const stringIsAValidUrl = (s) => {
	try {
		new URL(s);
		return true;
	} catch (err) {
		return false;
	}
};

const loadCommands = (commandDirectoryPath) => {
	const clientCommands = new Collection();
	const clientAliases = new Collection();

	const commandArray = getAllCommands(commandDirectoryPath);

	for (const commandItem of commandArray) {
		// Remove cached commands
		if (require.cache[require.resolve(commandItem)]) delete require.cache[require.resolve(commandItem)];

		const command = require(commandItem);

		// Check if command enabled
		if (!command.enabled) break;

		// Add command to commands collection and map aliases
		clientCommands.set(command.name, command);
		if (command.aliases) {
			for (const alias of command.aliases) {
				clientAliases.set(alias, command.name);
			}
		}
	}

	return { commands: clientCommands, aliases: clientAliases };
};

const truncateStr = (str, maxLength) => {
	return str.substr(0, maxLength);
};

function formatTime(ms) {
	let seconds = (ms / 1000).toFixed(1);
	let minutes = (ms / (1000 * 60)).toFixed(1);
	let hours = (ms / (1000 * 60 * 60)).toFixed(1);
	let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
	if (seconds < 60) return seconds + " Sec";
	else if (minutes < 60) return minutes + " Min";
	else if (hours < 24) return hours + " Hrs";
	else return days + " Days";
}

module.exports = { loadCommands, truncateStr, getAllCommands, stringIsAValidUrl, formatTime };
