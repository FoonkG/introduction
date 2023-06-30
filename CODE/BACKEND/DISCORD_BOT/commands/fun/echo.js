const { prefix } = require("../../config.json");

module.exports = {
	name: "echo",
	aliases: ["say", "repeat"],
	description: `Repeats your message | Usage: ${prefix}echo <msg>`,
	enabled: true,
	execute(client, message, args) {
		message.channel.send(`> ${args.length !== 0 ? args.join(" ") : ":thinking:"}`);
	},
};
