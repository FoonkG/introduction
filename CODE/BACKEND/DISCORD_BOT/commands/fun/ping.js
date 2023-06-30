module.exports = {
	name: "ping",
	aliases: ["latency"],
	description: "Calculates message latency",
	enabled: true,
	execute(client, message) {
		message.channel.send("Wolololololo...").then((sentMsg) => {
			sentMsg.edit(`Wololo took \`${sentMsg.createdTimestamp - message.createdTimestamp}ms\``);
		});
	},
};
