const {
    myDiscord
} = require('../config.json');

module.exports = {
    name: 'video share',
    description: 'Automatically adds videos shared to a playlist to be accessed later.',
    guildOnly: true,
    requiresPrefix: false,
    execute(message) {
        message.channel.send("That do be a video");
    }
};