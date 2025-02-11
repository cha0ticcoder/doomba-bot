import { Events, Message } from "discord.js";

export const event = {
    name: Events.MessageCreate,
    async execute(message: Message) {

        if (message.author.id === message.client.user.id) {
            return;
        }

    },
};