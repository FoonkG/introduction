const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "weekly",
	aliases: [],
	description: `Get your weekly coins. | Usage: ${prefix}weekly`,
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
					cash: 500,
					bank: 0,
					timestampWeekly: Date.now().toString(),
				});

				message.channel.send("+ 500 coins");
			} else {
				const days = (Date.now() - parseInt(result[0].timestampWeekly)) / 86_400_000;

				if (!result[0].timestampWeekly || days >= 7) {
					await Database.database.User.update(
						{
							cash: result[0].cash + 500,
							timestampWeekly: Date.now().toString(),
						},
						{
							where: {
								discordID: message.author.id,
							},
						}
					);
					message.channel.send("+ 500 coins");
				} else {
					message.channel.send(
						`You must wait ${formatTime(604_800_000 - (Date.now() - parseInt(result[0].timestampWeekly)))} before doing weekly again`
					);
				}
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
