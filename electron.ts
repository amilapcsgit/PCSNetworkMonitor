// Fix: Switched to a namespace import for Electron to prevent module resolution conflicts
// caused by the file being named 'electron.ts'. This resolves errors for 'app',
// 'BrowserWindow', and Node.js types like `Buffer` and globals like `__dirname`.
import * as Electron from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import os from 'os';
import fs from 'fs';

const REFRESH_INTERVAL_MS = 10000; // 10 seconds

function createWindow(): Electron.BrowserWindow {
  const mainWindow = new Electron.BrowserWindow({
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

  if (Electron.app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
  } else {
    mainWindow.loadURL('http://localhost:8001');
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

function getScriptPath(): string {
    const scriptName = 'get-connections.ps1';
    let scriptPath: string;
    
    if (Electron.app.isPackaged) {
        // For packaged app (both installer and portable)
        const appPath = Electron.app.getAppPath();
        
        // Try different possible locations
        const possiblePaths = [
            path.join(appPath, '..', '..', scriptName),  // Portable: next to exe
            path.join(appPath, '..', scriptName),         // Installer resources
            path.join(appPath, scriptName),               // In app.asar root
        ];
        
        scriptPath = possiblePaths[0]; // Default to first
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                scriptPath = p;
                break;
            }
        }
    } else {
        // In development, script is in project root
        scriptPath = path.join(__dirname, '..', scriptName);
    }

    return scriptPath;
}

function fetchNetworkConnections(window: Electron.BrowserWindow) {
    const scriptPath = getScriptPath();
    console.log(`Fetching network connections using script at: ${scriptPath}`);
    
    if (!fs.existsSync(scriptPath)) {
        console.error(`Script not found at: ${scriptPath}`);
        window.webContents.send('connections-error', `PowerShell script not found at: ${scriptPath}`);
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

    ps.on('close', (code: number | null) => {
        if (code === 0 && stdoutData) {
            try {
                const connections = JSON.parse(stdoutData);
                window.webContents.send('connections-update', connections);
            } catch (e) {
                console.error('Failed to parse PowerShell output:', e, 'Raw output:', stdoutData);
                window.webContents.send('connections-error', 'Failed to parse network data.');
            }
        } else {
            console.error(`PowerShell script exited with code ${code}: ${stderrData}`);
            window.webContents.send('connections-error', `Error executing script: ${stderrData || 'No error output'}`);
        }
    });
}

Electron.app.whenReady().then(() => {
  const mainWindow = createWindow();

  fetchNetworkConnections(mainWindow);
  setInterval(() => fetchNetworkConnections(mainWindow), REFRESH_INTERVAL_MS);

  Electron.app.on('activate', () => {
    if (Electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

Electron.app.on('window-all-closed', () => {
  if (os.platform() !== 'darwin') {
    Electron.app.quit();
  }
});