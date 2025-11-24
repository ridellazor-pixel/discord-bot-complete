// Get DOM elements
const statusBadge = document.getElementById('status');
const timestampEl = document.getElementById('timestamp');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const refreshBtn = document.getElementById('refreshBtn');
const logsContainer = document.getElementById('logs');

// Event listeners
startBtn.addEventListener('click', startBot);
stopBtn.addEventListener('click', stopBot);
refreshBtn.addEventListener('click', checkBotStatus);

// Check bot status on page load
window.addEventListener('load', () => {
  checkBotStatus();
  setInterval(checkBotStatus, 30000); // Auto-refresh every 30 seconds
});

// Check bot status
async function checkBotStatus() {
  try {
    const response = await fetch('/api/bot-status');
    const data = await response.json();
    
    updateStatus(data.status);
    updateTimestamp(data.timestamp);
    addLog(`Status check: ${data.status}`, 'info');
  } catch (error) {
    console.error('Error checking bot status:', error);
    addLog('Failed to check status', 'error');
  }
}

// Start bot
async function startBot() {
  try {
    startBtn.disabled = true;
    startBtn.textContent = 'Starting...';
    addLog('Starting bot...', 'info');
    
    const response = await fetch('/api/start-bot', { method: 'POST' });
    const data = await response.json();
    
    if (response.ok) {
      addLog('Bot started successfully', 'success');
      setTimeout(() => checkBotStatus(), 2000);
    } else {
      addLog(`Error: ${data.error}`, 'error');
    }
  } catch (error) {
    console.error('Error starting bot:', error);
    addLog('Failed to start bot', 'error');
  } finally {
    startBtn.disabled = false;
    startBtn.textContent = 'Start Bot';
  }
}

// Stop bot
async function stopBot() {
  try {
    stopBtn.disabled = true;
    stopBtn.textContent = 'Stopping...';
    addLog('Stopping bot...', 'info');
    
    const response = await fetch('/api/stop-bot', { method: 'POST' });
    const data = await response.json();
    
    if (response.ok) {
      addLog('Bot stopped successfully', 'success');
      setTimeout(() => checkBotStatus(), 2000);
    } else {
      addLog(`Error: ${data.error}`, 'error');
    }
  } catch (error) {
    console.error('Error stopping bot:', error);
    addLog('Failed to stop bot', 'error');
  } finally {
    stopBtn.disabled = false;
    stopBtn.textContent = 'Stop Bot';
  }
}

// Update status display
function updateStatus(status) {
  statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  statusBadge.classList.remove('running', 'stopped');
  
  if (status === 'running') {
    statusBadge.classList.add('running');
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    statusBadge.classList.add('stopped');
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

// Update timestamp
function updateTimestamp(timestamp) {
  const date = new Date(timestamp);
  timestampEl.textContent = `Last updated: ${date.toLocaleString()}`;
}

// Add log entry
function addLog(message, type = 'info') {
  const logEntry = document.createElement('p');
  logEntry.className = `log-entry ${type}`;
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logsContainer.insertBefore(logEntry, logsContainer.firstChild);
  
  // Keep only last 50 logs
  while (logsContainer.children.length > 50) {
    logsContainer.removeChild(logsContainer.lastChild);
  }
}
