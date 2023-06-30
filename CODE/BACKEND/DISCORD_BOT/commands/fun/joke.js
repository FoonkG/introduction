const got = require("got");
const { prefix } = require("../../config.json");

module.exports = {
	name: "joke",
	aliases: [],
	description: `Gives a joke | Usage: ${prefix}joke`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const response = await got("https://v2.jokeapi.dev/joke/Any");

			const joke = JSON.parse(response.body);

			message.channel.send(joke.type == "twopart" ? `${joke.setup}\n${joke.delivery}` : `${joke.joke}`);
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
