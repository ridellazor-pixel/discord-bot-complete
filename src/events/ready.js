import { REST, Routes } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`\n✅ Bot logged in as ${client.user.tag}`);
    console.log(`🚀 Ready to serve ${client.guilds.cache.size} guild(s)!\n`);

    // Register slash commands globally
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    
    try {
      const commands = client.commands.map(cmd => cmd.data.toJSON());
      console.log(`📝 Registering ${commands.length} slash commands...`);
      
      if (process.env.GUILD_ID) {
        // Guild-specific registration (faster for testing)
        await rest.put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
          { body: commands }
        );
        console.log(`✅ Registered commands in guild ${process.env.GUILD_ID}`);
      } else {
        // Global registration (can take up to 1 hour to propagate)
        await rest.put(
          Routes.applicationCommands(process.env.CLIENT_ID),
          { body: commands }
        );
        console.log('✅ Registered commands globally');
      }
    } catch (error) {
      console.error('❌ Failed to register commands:', error);
    }
  },
};
