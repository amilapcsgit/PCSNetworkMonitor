// Fix: Switched to a namespace import for Electron to resolve errors where named
// imports for 'contextBridge', 'ipcRenderer', and 'IpcRendererEvent' were not found.
import * as Electron from 'electron';
import type { ConnectionDetail } from './types';

Electron.contextBridge.exposeInMainWorld('electronAPI', {
  onConnectionUpdate: (callback: (connections: ConnectionDetail[]) => void) =>
    Electron.ipcRenderer.on('connections-update', (_event: Electron.IpcRendererEvent, value: ConnectionDetail[]) => callback(value)),
  onConnectionError: (callback: (error: string) => void) =>
    Electron.ipcRenderer.on('connections-error', (_event: Electron.IpcRendererEvent, value: string) => callback(value)),
  requestRefresh: () => Electron.ipcRenderer.send('request-refresh'),
  removeAllListeners: () => {
    Electron.ipcRenderer.removeAllListeners('connections-update');
    Electron.ipcRenderer.removeAllListeners('connections-error');
  }
});

// It's good practice to declare the types for the exposed API
declare global {
  interface Window {
    electronAPI: {
      onConnectionUpdate: (callback: (connections: ConnectionDetail[]) => void) => void;
      onConnectionError: (callback: (error: string) => void) => void;
      requestRefresh: () => void;
      removeAllListeners: () => void;
    };
  }
}