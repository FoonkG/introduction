const cowsay = require("cowsay");
const { prefix } = require("../../config.json");

module.exports = {
	name: "cow",
	aliases: ["cowsay"],
	description: `Let a cow say your message | Usage: ${prefix}cow`,
	enabled: true,
	async execute(client, message, args) {
		if (args[0]) {
			message.channel.send(
				"```" +
					cowsay.say({
						text: args.join(" "),
					}) +
					"```"
			);
		}
	},
};
