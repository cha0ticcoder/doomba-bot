// Require dotenv
import "dotenv/config";

// Require the necessary Node Packages
import fs from "node:fs";
import path from "node:path";
const __dirname = import.meta.dirname;

// Require the necessary discord.js classes & bot token

import { Client, Collection, GatewayIntentBits } from "discord.js";
const token = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && !file.startsWith('_'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const { command } = await import('file://' + filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js') && !file.startsWith('_'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { event } = await import('file://' + filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord with your client's token
client.login(token);
