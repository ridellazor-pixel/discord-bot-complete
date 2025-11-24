import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pong')
    .setDescription('Respond with pong'),
  async execute(interaction) {
    await interaction.reply('Pong! 🏓');
  },
};
