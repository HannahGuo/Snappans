const {
	myDiscord
} = require('../config.json');

module.exports = {
	name: 'spam',
	description: 'Spam ping your friends, because who wouldn\'t??',
	guildOnly: true,
	usage: ['<user>', '<image-link>'],
	requiresPrefix: true,
	execute(message, args) {
		if (args.length == 1) {
			if (!args[0].match(/<@.?[0-9]*?>/g)) {
				message.channel.send("Please only use a tagged user as an argument! Example: \`!ping " + this.usage[0] + "`");
				return;
			} else if (args[0].includes(myDiscord.number) && ((message.author.username != myDiscord.name || message.author.discriminator != myDiscord.identifier) || message.author.bot)) {
				// Stopping people from spamming my account because... that was happening.
				message.channel.send("No you can't spam ping the creator. That's mean :( ");
				return;
			}

			let messageToSend = "";
			let seperator = "\n";
			while (messageToSend.length < 2000 - args[0].length - seperator.length) {
				messageToSend += args[0] + seperator;
			}
			for (let i = 0; i < 4; i++) message.channel.send(messageToSend);
			message.channel.send(`${args[0]} should probably open Discord and respond to ${message.author.username}.`);
		} else if(args.length == 2) {
			if (!args[0].match(/<@.?[0-9]*?>/g) || !args[1].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)) {
				message.channel.send("Please only use a tagged user as the first argument and an image link as the second! Example: \`!ping " + this.usage[0] + " " + this.usage[1] + "`");
				return;
			} else if (args[0].includes(myDiscord.number) && ((message.author.username != myDiscord.name || message.author.discriminator != myDiscord.identifier) || message.author.bot)) {
				// Stopping people from spamming my account because... that was happening.
				message.channel.send("No you can't spam ping the creator. That's mean :( ");
				return;
			}

			for (let i = 0; i < 4; i++) message.channel.send(args[0] + " " + args[1]);
			message.channel.send(`${args[0]} should probably open Discord and respond to ${message.author.username}.`);
		}
	}
};