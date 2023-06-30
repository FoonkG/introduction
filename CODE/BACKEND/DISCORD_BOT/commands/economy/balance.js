const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");

module.exports = {
	name: "balance",
	aliases: ["bal"],
	description: `Check your account balance. | Usage: ${prefix}balance`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const result = await Database.database.User.findAll({
				where: {
					discordID: message.author.id,
				},
			});

			const newEmbed = new MessageEmbed().setColor("#FFFFFF").setTitle("Balance").setTimestamp().setFooter("");

			if (result.length > 0) {
				newEmbed.addFields(
					...[
						{ name: "Cash", value: `${result[0].cash} coins` },
						{ name: "Bank", value: `${result[0].bank} coins` },
					]
				);
			} else {
				newEmbed.addFields(
					...[
						{ name: "Cash", value: "0" },
						{ name: "Bank", value: "0" },
					]
				);
			}

			message.channel.send({ embeds: [newEmbed] });
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
