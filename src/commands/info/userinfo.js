import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption(option => 
      option.setName('user').setDescription('The user to get info about')
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`User Info: ${user.tag}`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'ID', value: user.id },
        { name: 'Created', value: user.createdAt.toDateString() },
        { name: 'Joined', value: member.joinedAt?.toDateString() || 'Unknown' },
        { name: 'Bot', value: user.bot ? 'Yes' : 'No' }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
