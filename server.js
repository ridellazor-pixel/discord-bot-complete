import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

let botProcess;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get bot status
app.get('/api/bot-status', (req, res) => {
  res.json({
    status: botProcess ? 'running' : 'stopped',
    timestamp: new Date().toISOString(),
  });
});

// API endpoint to start bot
app.post('/api/start-bot', (req, res) => {
  if (botProcess) {
    return res.status(400).json({ error: 'Bot is already running' });
  }

  botProcess = spawn('node', ['src/index.js'], {
    cwd: __dirname,
    stdio: 'inherit',
  });

  botProcess.on('error', (err) => {
    console.error('Failed to start bot:', err);
    botProcess = null;
  });

  botProcess.on('exit', () => {
    console.log('Bot process exited');
    botProcess = null;
  });

  res.json({ status: 'Bot started' });
});

// API endpoint to stop bot
app.post('/api/stop-bot', (req, res) => {
  if (!botProcess) {
    return res.status(400).json({ error: 'Bot is not running' });
  }

  botProcess.kill();
  botProcess = null;
  res.json({ status: 'Bot stopped' });
});

// Start the web server
app.listen(PORT, () => {
  console.log(`Web server running on http://localhost:${PORT}`);
  // Auto-start the bot when server starts
  setTimeout(() => {
    if (!botProcess) {
      console.log('Auto-starting Discord bot...');
      botProcess = spawn('node', ['src/index.js'], {
        cwd: __dirname,
        stdio: 'inherit',
      });
    }
  }, 2000);
});

export default app;
