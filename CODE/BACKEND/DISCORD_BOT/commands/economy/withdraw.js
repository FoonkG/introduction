const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "withdraw",
	aliases: [],
	description: `Withdraw cash to from bank. | Usage: ${prefix}withdraw {amount}`,
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
					cash: 0,
					bank: 0,
				});
				message.channel.send(`Not enough funds to withdraw ${args[0]} from your Bank`);
			} else {
				if (args.length == 0 || isNaN(args[0]) || args[0] <= 0) {
					message.channel.send(`You need to specify a valid amount to withdraw`);
				} else if (result[0].bank >= parseInt(args[0])) {
					await Database.database.User.update(
						{
							cash: result[0].cash + parseInt(args[0]),
							bank: result[0].bank - parseInt(args[0]),
						},
						{
							where: {
								discordID: message.author.id,
							},
						}
					);

					message.channel.send(`Succesfully withdrawn ${args[0]} from your Bank`);
				} else {
					message.channel.send(`Not enough funds to withdraw ${args[0]} from your Bank`);
				}
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
