import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();
client.startTime = Date.now();

// Load events
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = (await import(`file://${filePath}`)).default;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`✅ Loaded event: ${event.name}`);
}

// Load commands
const categoriesPath = join(__dirname, 'commands');
const categories = readdirSync(categoriesPath);

for (const category of categories) {
  const categoryPath = join(categoriesPath, category);
  const commandFiles = readdirSync(categoryPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(categoryPath, file);
    const command = (await import(`file://${filePath}`)).default;
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name} (${category})`);
    } else {
      console.warn(`⚠️ Command ${file} missing required properties`);
    }
  }
}

client.login(process.env.TOKEN);

export default client;
