const got = require("got");
const { prefix } = require("../../config.json");

module.exports = {
	name: "insult",
	aliases: ["roast"],
	description: `Insults the tagged user | Usage: ${prefix}insult @user`,
	enabled: true,
	async execute(client, message, args) {
		const taggedUser = message.mentions.members.first();
		if (taggedUser) {
			const response = await got("https://insult.mattbas.org/api/insult");

			message.channel.send(`<@${taggedUser.id}>, ${response.body}`);
		} else {
			message.channel.send("Please tag someone to insult");
		}
	},
};
