# Discord Bot Complete - Commands Template

This file documents all 60+ slash commands with templates. Each command follows the Discord.js v14 pattern.

## FUN COMMANDS (10+)

### 1. ping.js
Check bot latency
```javascript
import { SlashCommandBuilder } from 'discord.js';
export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Check bot latency'),
  async execute(interaction) {
    const latency = Math.round(interaction.client.ws.ping);
    await interaction.reply(`Pong! ${latency}ms`);
  },
};
```

### 2. joke.js
Tell programming jokes

### 3. pong.js
Respond with pong

### 4. 8ball.js
Magic 8 ball answers

### 5. coinflip.js
Flip a coin (Heads/Tails)

### 6. roll.js
Roll a 6-sided dice

### 7. randomnumber.js
Generate random number with range

### 8. say.js
Make bot repeat text

### 9. reverse.js
Reverse text string

### 10. meme.js
Fetch random meme (placeholder)

---

## INFO COMMANDS (10+)

### 11. userinfo.js
Get user profile information

### 12. serverinfo.js
Get server/guild information

### 13. avatar.js
Display user avatar URL

### 14. botinfo.js
Display bot statistics

### 15. uptime.js
Show bot uptime since startup

### 16. channelinfo.js
Get channel details

### 17. roleinfo.js
Get role information

### 18. membercount.js
Show total server members

### 19. permissions.js
Check user permissions in channel

### 20. pingws.js
WebSocket ping

---

## UTILITY COMMANDS (10+)

### 21. calc.js
Simple calculator

### 22. define.js
Define a word (uses API or built-in)

### 23. translate.js
Translate text (placeholder)

### 24. qr.js
Generate QR code

### 25. weather.js
Get weather information

### 26. time.js
Get current time in timezone

### 27. remind.js
Set a reminder

### 28. shortenurl.js
Shorten URL

### 29. color.js
Display color information

### 30. download.js
Download media placeholder

---

## MODERATION COMMANDS (10+)

### 31. ban.js
Ban user from server

### 32. kick.js
Kick user from server

### 33. mute.js
Mute user (timeout)

### 34. unmute.js
Unmute user

### 35. warn.js
Warn user

### 36. warnings.js
Check user warnings

### 37. clear.js
Delete messages in channel

### 38. slowmode.js
Set channel slowmode

### 39. lock.js
Lock channel from messages

### 40. unlock.js
Unlock channel

---

## GAME COMMANDS (10+)

### 41. tictactoe.js
Play Tic Tac Toe game

### 42. hangman.js
Play Hangman

### 43. rps.js
Rock Paper Scissors vs bot

### 44. guess.js
Guess the number game

### 45. slots.js
Slot machine game

### 46. mines.js
Minesweeper game

### 47. quiz.js
Trivia quiz game

### 48. mathrace.js
Math problem race

### 49. speedtype.js
Speed typing game

### 50. battle.js
Battle simulator game

---

## ADDITIONAL COMMANDS (10+)

### 51. invite.js
Get bot invite link

### 52. support.js
Get support server link

### 53. help.js
List all commands

### 54. stats.js
Bot statistics

### 55. anime.js
Search anime (placeholder)

### 56. cat.js
Random cat image

### 57. dog.js
Random dog image

### 58. minecraft.js
Minecraft username check

### 59. bitcoin.js
Bitcoin price

### 60. githubuser.js
GitHub user info

---

## Command Template Pattern

All commands follow this structure:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Command description')
    .addStringOption(option => 
      option.setName('option')
            .setDescription('Option description')
            .setRequired(true)
    ),
  async execute(interaction) {
    try {
      // Command logic here
      await interaction.reply('Response');
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Error executing command!', ephemeral: true });
    }
  },
};
```

## Creating New Commands

1. Create file: `src/commands/category/commandname.js`
2. Use the pattern above
3. Restart bot (auto-loads)
4. Command is ready!

## File Organization

```
src/commands/
├── fun/
│   ├── ping.js
│   ├── joke.js
│   └── ... (10+ files)
├── info/
│   ├── userinfo.js
│   └── ... (10+ files)
├── utility/
│   ├── calc.js
│   └── ... (10+ files)
├── moderation/
│   ├── ban.js
│   └── ... (10+ files)
└── games/
    ├── tictactoe.js
    └── ... (10+ files)
```

Total: 60+ slash commands
