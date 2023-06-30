const { MessageEmbed } = require("discord.js");
const { getAllCommands } = require("../utils");

module.exports = {
	name: "help",
	aliases: [],
	description: "Shows this help menu",
	enabled: true,
	execute(client, message, args) {
		const newEmbed = new MessageEmbed()
			.setColor("#FFFFFF")
			.setTitle("Help Menu")
			.setDescription("Here's a list of all commands")
			.addFields(
				...getAllCommands()
					.filter((commandItem) => {
						return !commandItem.isAdmin;
					})
					.map((commandItem, i) => {
						const cmd = require(commandItem);
						return { name: cmd.name, value: cmd.description, inline: i % 2 != 0 };
					})
			)
			.setTimestamp()
			.setFooter("");

		message.channel.send({ embeds: [newEmbed] });
	},
};
