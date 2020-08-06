const fs = require('fs');
const Discord = require('discord.js');
const {
  prefix,
  token
} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const passiveCommandFiles = fs.readdirSync('./passiveCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of passiveCommandFiles) {
  const command = require(`./passiveCommands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  console.log(client.commands);
  if (message.content.startsWith(prefix)) {
    // Active Commands
    if (message.author.bot) return; // Don't reply to other bots

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('No DM Commands >:(');
    }

    try {
      command.execute(message, args);
    } catch (error) {
      console.error("No such command! Error: " + error);
    }
  } else {
    // Passive commands/actions
    if (message.embeds[0]) {
      console.log(message.embeds[0]);
      if (message.embeds[0].provider.name + message.embeds[0].provider.url === "YouTubeYouTube") {
        const command = client.commands.get("video share");
        try {
          command.execute(message);
        } catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
      }
    }
  }
});

client.login(token);