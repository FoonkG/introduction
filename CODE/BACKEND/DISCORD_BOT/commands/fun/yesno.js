const got = require("got");
const { prefix } = require("../../config.json");

module.exports = {
	name: "yesno",
	aliases: [],
	description: `Answers your question with yes or no | Usage: ${prefix}yesno <question>`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const response = await got("https://yesno.wtf/api/");

			const parsed = JSON.parse(response.body);

			message.reply(`${parsed.answer} ${parsed.image}`);
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
