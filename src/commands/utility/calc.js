import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Simple calculator')
    .addStringOption(option =>
      option.setName('expression').setDescription('Math expression (e.g., 2+2)').setRequired(true)
    ),
  async execute(interaction) {
    const expr = interaction.options.getString('expression');
    try {
      const result = Function('"use strict"; return (' + expr + ')')();
      await interaction.reply(`${expr} = **${result}**`);
    } catch (error) {
      await interaction.reply('Invalid expression!');
    }
  },
};
