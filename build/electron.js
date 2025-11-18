"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const REFRESH_INTERVAL_MS = 10000; // 10 seconds
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        icon: path_1.default.join(__dirname, '..', 'assets', 'icon.png'), // Assuming icon is in an assets folder
        backgroundColor: '#121212',
        show: false, // Don't show until ready
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    if (electron_1.app.isPackaged) {
        mainWindow.loadFile(path_1.default.join(__dirname, '..', 'index.html'));
    }
    else {
        mainWindow.loadURL('http://localhost:8001');
        mainWindow.webContents.openDevTools();
    }
    return mainWindow;
}
function getScriptPath() {
    const scriptName = 'get-connections.ps1';
    let scriptPath;
    if (electron_1.app.isPackaged) {
        // For packaged app (both installer and portable)
        const appPath = electron_1.app.getAppPath();
        // Try different possible locations
        const possiblePaths = [
            path_1.default.join(appPath, '..', '..', scriptName), // Portable: next to exe
            path_1.default.join(appPath, '..', scriptName), // Installer resources
            path_1.default.join(appPath, scriptName), // In app.asar root
        ];
        scriptPath = possiblePaths[0]; // Default to first
        for (const p of possiblePaths) {
            if (fs_1.default.existsSync(p)) {
                scriptPath = p;
                break;
            }
        }
    }
    else {
        // In development, script is in project root
        scriptPath = path_1.default.join(__dirname, '..', scriptName);
    }
    return scriptPath;
}
function fetchNetworkConnections(window) {
    const scriptPath = getScriptPath();
    console.log(`Fetching network connections using script at: ${scriptPath}`);
    if (!fs_1.default.existsSync(scriptPath)) {
        console.error(`Script not found at: ${scriptPath}`);
        window.webContents.send('connections-error', `PowerShell script not found at: ${scriptPath}`);
        return;
    }
    const ps = (0, child_process_1.spawn)('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath]);
    let stdoutData = '';
    let stderrData = '';
    ps.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });
    ps.stderr.on('data', (data) => {
        stderrData += data.toString();
    });
    ps.on('close', (code) => {
        if (code === 0 && stdoutData) {
            try {
                const connections = JSON.parse(stdoutData);
                window.webContents.send('connections-update', connections);
            }
            catch (e) {
                console.error('Failed to parse PowerShell output:', e, 'Raw output:', stdoutData);
                window.webContents.send('connections-error', 'Failed to parse network data.');
            }
        }
        else {
            console.error(`PowerShell script exited with code ${code}: ${stderrData}`);
            window.webContents.send('connections-error', `Error executing script: ${stderrData || 'No error output'}`);
        }
    });
}
electron_1.app.whenReady().then(() => {
    const mainWindow = createWindow();
    fetchNetworkConnections(mainWindow);
    setInterval(() => fetchNetworkConnections(mainWindow), REFRESH_INTERVAL_MS);
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (os_1.default.platform() !== 'darwin') {
        electron_1.app.quit();
    }
});
