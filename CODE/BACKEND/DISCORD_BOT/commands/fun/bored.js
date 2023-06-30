const got = require("got");
const { prefix } = require("../../config.json");

module.exports = {
	name: "bored",
	aliases: [],
	description: `Are you bored? Get some inspiration. | Usage: ${prefix}bored`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const response = await got("https://www.boredapi.com/api/activity");

			const activity = JSON.parse(response.body);

			message.channel.send(`${activity.activity} ${activity.link}`);
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
