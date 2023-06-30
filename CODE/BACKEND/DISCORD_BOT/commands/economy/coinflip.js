const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const Database = require("../../db/index");
const { formatTime } = require("../../utils");

module.exports = {
	name: "coinflip",
	aliases: [],
	description: `coinflip. | Usage: ${prefix}gamble {amount} {heads/tails}`,
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

				message.channel.send("You don't have enough coins to gamble");
			} else {
				if (args.length < 2 || isNaN(args[0]) || args[0] <= 0 || !(args[1] == "heads" || args[1] == "tails")) {
					message.channel.send("You need to specify a valid amount you want to bet and heads or tails");
				} else if (result[0].cash >= parseInt(args[0])) {
					const rand = Math.floor(Math.random() * 10) + 1;
					const side = rand <= 5 ? "heads" : "tails";
					let profit;
					let txt = `it is ${side}!\n`;

					if (side == args[1]) {
						profit = parseInt(args[0]);
						txt += `You won ${profit} :star_struck:`;
					} else {
						profit = -parseInt(args[0]);
						txt += `You lost ${Math.abs(profit)} :smiling_face_with_tear:`;
					}

					message.channel.send(txt);

					await Database.database.User.update(
						{
							cash: result[0].cash + profit,
						},
						{
							where: { discordID: message.author.id },
						}
					);
				} else {
					message.channel.send(`Not enough funds to coinflip ${args[0]}`);
				}
			}
		} catch (error) {
			console.log(error);
			message.channel.send("Something went wrong");
		}
	},
};
