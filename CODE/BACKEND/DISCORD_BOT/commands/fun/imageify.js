const { prefix } = require("../../config.json");
const textToImage = require("text-to-image");

module.exports = {
	name: "imageify",
	aliases: ["imgf"],
	description: `Makes an image out of your text | Usage: ${prefix}imageify <msg>`,
	enabled: true,
	async execute(client, message, args) {
		const dataUri = await textToImage.generate(args.join(" "), {
			fontSize: 30,
			fontFamily: "Arial",
			margin: 5,
			bgColor: "white",
			textColor: "black",
			textAlign: "center",
			verticalAlign: "center",
		});

		const sfbuff = new Buffer.from(dataUri.split(",")[1], "base64");
		message.channel.send({ files: [{ attachment: sfbuff }] });
	},
};
