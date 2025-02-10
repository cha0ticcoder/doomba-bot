import { Events } from "discord.js";

export const event = {
    name: Events.MessageCreate,
    async execute(message) {

        if (message.author.id === message.client.user.id) {
            return;
        }

        message.react('👍');
    },
};