import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import os from 'os';
import fs from 'fs';
import type { ConnectionDetail } from './types';
import { MOCK_CONNECTIONS } from './utils/mockConnections';

const REFRESH_INTERVAL_MS = 10000; // 10 seconds
let mainWindow: BrowserWindow | null = null;
let refreshInterval: NodeJS.Timeout | null = null;
const isWindows = os.platform() === 'win32';

const sendMockData = (window: BrowserWindow, reason: string) => {
  console.warn(`Falling back to mock data: ${reason}`);
  if (!window.isDestroyed()) {
    const enrichedMock: ConnectionDetail[] = MOCK_CONNECTIONS.map((conn, idx) => ({
      ...conn,
      processId: conn.processId + idx,
    }));
    window.webContents.send('connections-update', enrichedMock);
  }
};

const triggerFetch = () => {
  if (mainWindow) {
    fetchNetworkConnections(mainWindow);
  }
};

const startPolling = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  refreshInterval = setInterval(triggerFetch, REFRESH_INTERVAL_MS);
};

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '..', 'assets', 'icon.png'), // Assuming icon is in an assets folder
    backgroundColor: '#121212',
    show: false, // Don't show until ready
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:8001');
    mainWindow.webContents.openDevTools();
  } else {
    const indexHtmlPath = path.join(app.getAppPath(), 'build', 'index.html');
    mainWindow.loadFile(indexHtmlPath);
  }

  return mainWindow;
}

function getScriptPath(): string {
    const scriptName = 'get-connections.ps1';

    if (app.isPackaged) {
        return path.join(process.resourcesPath, scriptName);
    }

    return path.join(app.getAppPath(), scriptName);
}

function fetchNetworkConnections(window: BrowserWindow) {
    if (!isWindows) {
        sendMockData(window, 'PowerShell is unavailable on non-Windows environments');
        return;
    }

    const scriptPath = getScriptPath();
    console.log(`Fetching network connections using script at: ${scriptPath}`);

    if (!fs.existsSync(scriptPath)) {
        console.error(`Script not found at: ${scriptPath}`);
        sendMockData(window, `PowerShell script not found at: ${scriptPath}`);
        return;
    }

    const ps = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath]);
    
    let stdoutData = '';
    let stderrData = '';

    ps.stdout.on('data', (data: Buffer) => {
        stdoutData += data.toString();
    });

    ps.stderr.on('data', (data: Buffer) => {
        stderrData += data.toString();
    });

    ps.on('error', (error: Error) => {
        console.error('PowerShell spawn failed:', error);
        sendMockData(window, error.message);
    });

    ps.on('close', (code: number | null) => {
        if (!window || window.isDestroyed()) {
            return;
        }

        if (code === 0 && stdoutData) {
            try {
                const connections = JSON.parse(stdoutData) as ConnectionDetail[];
                window.webContents.send('connections-update', connections);
            } catch (e) {
                console.error('Failed to parse PowerShell output:', e, 'Raw output:', stdoutData);
                sendMockData(window, 'Failed to parse network data');
            }
        } else {
            console.error(`PowerShell script exited with code ${code}: ${stderrData}`);
            sendMockData(window, stderrData || 'No error output');
        }
    });
}

app.whenReady().then(() => {
  mainWindow = createWindow();

  triggerFetch();
  startPolling();

  ipcMain.on('request-refresh', triggerFetch);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
      triggerFetch();
      startPolling();
    }
  });
});

app.on('window-all-closed', () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
  ipcMain.removeAllListeners('request-refresh');
  mainWindow = null;
  if (os.platform() !== 'darwin') {
    app.quit();
  }
});