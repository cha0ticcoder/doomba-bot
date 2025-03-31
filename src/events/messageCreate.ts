// Import Environment Variables
import 'dotenv/config';

// Import discord.js things
import { Events, Message } from "discord.js";

// Import DiscordEvent Type for type attenuation
import type { DiscordEvent } from "../discord.d.ts";

// Export Discord Event Listener
export const event: DiscordEvent = {
    name: Events.MessageCreate,
    async execute(message: Message) {

        if (message.author.id === message.client.user.id) {
            return;
        }

    },
};