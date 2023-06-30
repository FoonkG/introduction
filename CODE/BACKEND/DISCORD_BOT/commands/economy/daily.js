const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "daily",
	aliases: [],
	description: `Get your daily coins. | Usage: ${prefix}daily`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const result = await Database.database.User.findAll({
				where: {
					discordID: message.author.id,
				},
			});

			if (result.length == 0) {
				// Create user data
				await Database.database.User.create({
					discordID: message.author.id,
					cash: 50,
					bank: 0,
					timestampDaily: Date.now().toString(),
				});

				message.channel.send("+ 50 coins");
			} else {
				const hours = (Date.now() - parseInt(result[0].timestampDaily)) / 3_600_000;

				if (!result[0].timestampDaily || hours >= 24) {
					// Update user data
					await Database.database.User.update(
						{
							cash: result[0].cash + 50,
							timestampDaily: Date.now().toString(),
						},
						{
							where: {
								discordID: message.author.id,
							},
						}
					);
					message.channel.send("+ 50 coins");
				} else {
					message.channel.send(
						`You must wait ${formatTime(86_400_000 - (Date.now() - parseInt(result[0].timestampDaily)))} before doing daily again`
					);
				}
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
