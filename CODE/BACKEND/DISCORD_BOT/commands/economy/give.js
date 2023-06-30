const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "give",
	aliases: [],
	description: `Give cash to other players. | Usage: ${prefix}give {user} {amount}`,
	enabled: true,
	async execute(client, message, args) {
		try {
			const taggedID = message.mentions.users.values().next().value.id;

			const result = await Database.database.User.findAll({
				where: {
					discordID: message.author.id,
				},
			});

			const tagged = await Database.database.User.findAll({
				where: {
					discordID: taggedID,
				},
			});

			if (result.length == 0) {
				// Create user data
				await Database.database.User.create({
					discordID: message.author.id,
					cash: 0,
					bank: 0,
				});
				message.channel.send("Not enough funds to use give");
			} else if (tagged.length == 0) {
				message.channel.send("Target User does not exist");
			} else {
				if (args.length == 0 || isNaN(args[1]) || args[1] <= 0) {
					message.channel.send(`You need to specify a valid amount to give`);
				} else if (result[0].cash >= parseInt(args[1])) {
					await Database.database.User.update(
						{
							cash: result[0].cash - parseInt(args[1]),
						},
						{
							where: {
								discordID: message.author.id,
							},
						}
					);
					await Database.database.User.update(
						{
							cash: tagged[0].cash + parseInt(args[1]),
						},
						{
							where: {
								discordID: taggedID,
							},
						}
					);

					message.channel.send(`Succesfully transfered ${args[1]}`);
				} else {
					message.channel.send(`Not enough funds to transfer ${args[1]}`);
				}
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
