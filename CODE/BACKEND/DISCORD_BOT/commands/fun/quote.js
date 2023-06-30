const Quote = require("inspirational-quotes");

module.exports = {
	name: "quote",
	aliases: [],
	description: "Gives you an inspirational quote",
	enabled: true,
	execute(client, message) {
		message.channel.send(Quote.getRandomQuote());
	},
};
