# Discord Bot Complete 🤖

A production-ready Discord bot with **60+ slash commands**, modular command handler, and easy deployment setup.

## Features

✨ **60+ Slash Commands** organized in 5 categories
- Fun Commands (10+)
- Info Commands (10+)
- Utility Commands (10+)
- Moderation Commands (10+)
- Game Commands (10+)

🏗️ **Clean Architecture**
- Modular command handler with auto-loading
- Event-driven system
- Category-based command organization
- Error handling & logging

🚀 **Ready to Deploy**
- Supports Discord.js v14
- Environment variable configuration
- Works on Railway, Render, Heroku, and local machines

## Installation

### Prerequisites
- Node.js 16.9.0 or higher
- npm or yarn
- Discord Bot Token (from [Discord Developer Portal](https://discord.com/developers/applications))

### Step 1: Clone & Install Dependencies

```bash
git clone https://github.com/ridellazor-pixel/discord-bot-complete.git
cd discord-bot-complete
npm install
```

### Step 2: Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
TOKEN=your_discord_bot_token_here
CLIENT_ID=your_bot_client_id
GUILD_ID=your_test_guild_id  # Optional (for faster testing)
NODE_ENV=development
```

### Step 3: Run the Bot

**Development mode with auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Project Structure

```
discord-bot-complete/
├── src/
│   ├── commands/
│   │   ├── fun/
│   │   │   ├── ping.js
│   │   │   ├── joke.js
│   │   │   └── ... (more fun commands)
│   │   ├── info/
│   │   │   ├── userinfo.js
│   │   │   └── ... (more info commands)
│   │   ├── utility/
│   │   │   └── ... (utility commands)
│   │   ├── moderation/
│   │   │   └── ... (mod commands)
│   │   └── games/
│   │       └── ... (game commands)
│   ├── events/
│   │   ├── ready.js
│   │   └── interactionCreate.js
│   └── index.js (main entry point)
├── package.json
├── .env.example
└── README.md
```

## Available Commands

### Fun Commands
- `/ping` - Check bot latency
- `/joke` - Tell a programming joke
- `/pong` - Respond with pong
- `/8ball` - Magic 8 ball
- `/coinflip` - Flip a coin
- `/roll` - Roll a dice
- `/randomnumber` - Generate random number
- `/say` - Make bot say something
- `/reverse` - Reverse text
- `/meme` - Get a random meme (extensible)

### Info Commands
- `/userinfo` - Get user information
- `/serverinfo` - Get server information
- `/avatar` - Get user avatar
- `/botinfo` - Get bot information
- `/uptime` - Check bot uptime
- `/channelinfo` - Get channel information
- `/roleinfo` - Get role information
- `/membercount` - Get member count
- `/permissions` - Check user permissions
- `/pingws` - Check WebSocket ping

### Utility Commands
- `/calc` - Calculator
- `/define` - Define a word
- `/translate` - Translate text
- `/qr` - Generate QR code
- `/weather` - Get weather info
- `/time` - Get current time
- `/remind` - Set a reminder
- `/shortenurl` - Shorten URL
- `/color` - Get color information
- `/download` - Download media

### Moderation Commands
- `/ban` - Ban a user
- `/kick` - Kick a user
- `/mute` - Mute a user
- `/unmute` - Unmute a user
- `/warn` - Warn a user
- `/warnings` - Check user warnings
- `/clear` - Clear messages
- `/slowmode` - Set channel slowmode
- `/lock` - Lock channel
- `/unlock` - Unlock channel

### Game Commands
- `/tictactoe` - Play Tic Tac Toe
- `/hangman` - Play Hangman
- `/rps` - Rock Paper Scissors
- `/guess` - Guess the number
- `/slots` - Slot machine
- `/mines` - Minesweeper game
- `/quiz` - Quiz game
- `/mathrace` - Math race
- `/speedtype` - Speed typing
- `/battle` - Battle simulator

## How It Works

### Command Structure

Each command file exports a default object with `data` and `execute`:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency'),
  async execute(interaction) {
    const latency = Math.round(interaction.client.ws.ping);
    await interaction.reply(`Pong! Latency: ${latency}ms`);
  },
};
```

### Auto-Loading System

The bot automatically:
1. Scans `/src/commands/` for categories
2. Loads all `.js` files from each category
3. Registers commands globally or per guild (based on env)
4. Provides error handling & logging

### Event Handlers

- **ready.js**: Fires when bot connects, registers slash commands
- **interactionCreate.js**: Handles slash command interactions

## Deployment

### Deploy on Railway

1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Add environment variables (TOKEN, CLIENT_ID, GUILD_ID)
4. Railway auto-deploys with `npm start`

### Deploy on Render

1. Create new Web Service on Render
2. Connect GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables

### Deploy on Heroku (Legacy)

```bash
heroku create your-bot-name
heroku config:set TOKEN=your_token CLIENT_ID=your_id
git push heroku main
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TOKEN` | ✅ | Discord bot token |
| `CLIENT_ID` | ✅ | Bot application ID |
| `GUILD_ID` | ❌ | Guild ID for testing (faster registration) |
| `NODE_ENV` | ❌ | development or production |

### Bot Permissions

Ensure your bot has these permissions in Discord:
- Read Messages
- Send Messages
- Use Slash Commands
- Manage Messages (for moderation)
- Manage Channels (for moderation)
- Ban Members (for moderation)
- Kick Members (for moderation)

## Extending the Bot

### Adding a New Command

1. Create file: `src/commands/category/commandname.js`
2. Use template:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('cmdname')
    .setDescription('Command description'),
  async execute(interaction) {
    // Command logic here
    await interaction.reply('Response');
  },
};
```

3. Save and restart bot - it auto-loads!

### Adding a New Event

1. Create file: `src/events/eventname.js`
2. Use template:

```javascript
export default {
  name: 'eventName',
  once: false, // or true for one-time events
  execute(arg1, arg2, client) {
    // Event logic here
  },
};
```

## Troubleshooting

### Commands not showing up
- **Guild commands**: Check GUILD_ID is correct
- **Global commands**: Can take up to 1 hour to propagate
- **Permission**: Ensure bot has application.commands scope

### Bot not responding
- Verify TOKEN is correct in .env
- Check bot has Send Messages permission
- Verify intents in index.js are correct

### Errors on start
- Run `npm install` to ensure all dependencies
- Check NODE_ENV is set correctly
- Ensure .js files are valid JavaScript

## Support & Contributing

Found a bug? Want to suggest a feature?
- Open an issue on GitHub
- Submit a pull request
- Star this repo if you found it helpful!

## License

MIT License - Feel free to use this bot in your projects!

## Resources

- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Slash Commands Guide](https://discordjs.guide/interactions/slash-commands.html)

---

Made with ❤️ by ridellazor-pixel
