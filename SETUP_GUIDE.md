# Quick Setup Guide

## 5-Minute Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ridellazor-pixel/discord-bot-complete.git
cd discord-bot-complete
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env File
```bash
cp .env.example .env
```

Edit `.env` and add:
```
TOKEN=your_bot_token_here
CLIENT_ID=your_bot_client_id
GUILD_ID=your_test_server_id
```

### 4. Get Your Bot Token
1. Go to https://discord.com/developers/applications
2. Create New Application or select existing
3. Go to Bot section
4. Click "Add Bot"
5. Copy token to .env
6. Under OAuth2 > URL Generator:
   - Select scopes: `bot`, `applications.commands`
   - Select permissions: `Send Messages`, `Read Messages`, `Use Slash Commands`
   - Copy URL and invite bot to your server

### 5. Run the Bot
```bash
npm start      # Production
npm run dev    # Development (auto-reload)
```

You should see:
```
✅ Bot logged in as YourBotName#1234
🚀 Ready to serve 1 guild(s)!
📝 Registering 60+ slash commands...
✅ Registered commands in guild YOUR_GUILD_ID
```

### 6. Test Commands
In your Discord server, type `/ping` and the bot should respond!

---

## Adding Custom Commands

### Create a New Command
1. Create file: `src/commands/category/mycommand.js`
2. Use this template:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('mycommand')
    .setDescription('My custom command'),
  async execute(interaction) {
    await interaction.reply('Hello!');
  },
};
```

3. Restart bot (if not running with dev mode)
4. Test with `/mycommand`

---

## Deployment

### Railway (Recommended)
1. Push code to GitHub
2. Go to https://railway.app
3. Create new project → Deploy from GitHub
4. Select your repository
5. Add environment variables: TOKEN, CLIENT_ID, GUILD_ID
6. Deploy!

### Render
1. Create new Web Service on Render.com
2. Connect GitHub repo
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables
6. Deploy!

---

## Troubleshooting

**Bot not responding?**
- Check TOKEN in .env is correct
- Ensure bot has Send Messages permission
- Check bot is in the server

**Commands not showing?**
- If using GUILD_ID: may need 1 min to appear
- If using global: can take up to 1 hour
- Reload Discord (Ctrl+R or Cmd+R)

**Errors on startup?**
- Run `npm install` again
- Check .env file syntax
- Verify Node.js version (16.9.0+)

**Want to add more commands?**
- See COMMANDS_TEMPLATE.md for all 60+ command templates
- Follow the pattern and restart!

---

## Next Steps

- Add database support (MongoDB, PostgreSQL)
- Create a web dashboard
- Add reaction roles
- Implement logging system
- Add custom prefixes per server

Happy coding! 🚀
