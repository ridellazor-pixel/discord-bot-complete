import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot latency'),
  async execute(interaction) {
    const latency = Math.round(interaction.client.ws.ping);
    await interaction.reply(`Pong! Latency: ${latency}ms`);
  },
};
