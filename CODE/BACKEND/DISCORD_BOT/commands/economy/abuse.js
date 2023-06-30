const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "abuse",
	aliases: [],
	description: `Admin abuse. | Usage: ${prefix}abuse`,
	enabled: true,
	isAdmin: true,
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
					cash: 100_000,
					bank: 0,
				});
				message.channel.send("Succesfully added 100.000 to your account");
			} else {
				await Database.database.User.update(
					{
						cash: result[0].cash + 100_000,
					},
					{
						where: {
							discordID: message.author.id,
						},
					}
				);
				message.channel.send("Succesfully added 100.000 to your account");
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
