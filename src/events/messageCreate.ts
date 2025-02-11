import { Events, Message } from "discord.js";
import { DiscordEvent } from "../types.js";

export const event: DiscordEvent = {
    name: Events.MessageCreate,
    async execute(message: Message) {

        if (message.author.id === message.client.user.id) {
            return;
        }

    },
};