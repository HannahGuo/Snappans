module.exports = {
	name: 'spam',
	description: 'Spam ping your friends, because who wouldn\'t??',
	guildOnly: true,
	usage: '<user>',
	execute(message, args) {
		if (args.length != 1 || !args[0].match(/<@.?[0-9]*?>/)) {
			message.channel.send("Please only use a tagged user as an argument! Example: !ping @Person");
			return;
		} else if (args[0].includes("317326420617592833>") && message.author.username != "Myself⁷") {
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
	}
};