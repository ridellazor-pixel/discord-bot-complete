import { SlashCommandBuilder } from 'discord.js';

const jokes = [
  'Why did the developer go broke? Because he lost his cache!',
  'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
  'Why do Java developers wear glasses? Because they can\'t C#!',
  'Why did the programmer quit his job? Because he didn\'t get arrays!',
  'How many programmers does it take to change a light bulb? None, that\'s DevOps\' problem now.',
];

export default {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tell a programming joke'),
  async execute(interaction) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await interaction.reply(randomJoke);
  },
};
