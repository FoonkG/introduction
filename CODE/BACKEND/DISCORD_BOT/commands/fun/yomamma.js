const got = require("got");
const { prefix } = require("../../config.json");

module.exports = {
	name: "yomamma",
	aliases: ["yomom"],
	description: `Gives you a yo mamma joke | Usage: ${prefix}yomamma`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const response = await got("https://api.yomomma.info/");

			message.channel.send(JSON.parse(response.body).joke);
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
