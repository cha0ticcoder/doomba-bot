import { Client, Events as Ready } from "discord.js";

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.

export const event = {
    name: Ready.ClientReady,
    once: true,
    execute(client: Client): void {
        if (client.user == null) {
            console.error("Client User is null! Unexpected Behavior...");
            return;
        }
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};