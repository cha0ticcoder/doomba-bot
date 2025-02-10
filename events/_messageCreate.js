const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {

        if (message.author.id === message.client.user.id) {
            return;
        }

        message.react('👍');
    },
};