// Import of dotenv config
import "dotenv/config";

// Import of necessary Node Packages
import * as fs from "node:fs";
import * as path from "node:path";

// Import of necessary Discord.js *Stuff* 
import { Client, Collection, GatewayIntentBits } from 'discord.js';

// Declaration of Current Directory Variable and Bot Token
const __dirname: string = import.meta.dirname;
const token: string | undefined = process.env.DISCORD_BOT_TOKEN;

if (token === undefined) {
    throw new Error("No Token provided! Please check the .env file!");
}

// Create a new Discord Client instance with Intents and Initialization of Collections
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

client.commands = new Collection();
client.cooldowns = new Collection();

// Slash Command Loader / Handler

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts') && !file.startsWith('_'));
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

// Event Loader / Handler

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts') && !file.startsWith('_'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { event } = await import('file://' + filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord with bot token
client.login(token).then();
