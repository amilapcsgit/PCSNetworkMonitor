# Network Monitor

Real-time network connection monitoring and analysis application built with React, Electron, and TypeScript.

## Features

- **Real-time Network Monitoring**: Live visualization of your PC's network connections
- **Country-based Filtering**: Filter connections by destination country
- **Data Export**: Export connection data to CSV format
- **Interactive Charts**: Visual analysis of network traffic by country
- **Auto-refresh**: Automatic updates every 10 seconds
- **Clipboard Integration**: Quick copy functionality for connection data

## Prerequisites

- Node.js (v16 or higher)
- PowerShell (for network connection retrieval on Windows)

## Installation & First Run

The project now self-installs dependencies when you start it for the first time. You can still run `npm install` manually, but it is no longer required.

```bash
# Launch the React development build (installs dependencies automatically on first run)
npm run start
```

To launch the full Electron shell with the live dashboard and demo fallback:

```bash
npm run electron:start
```

## How to Test the Latest UI Improvements

1. Run `npm run electron:start`. The `ensure-deps` helper installs all npm, Electron, and tooling dependencies if they are missing, then boots both the renderer watchers and the Electron shell.
2. On non-Windows hosts (or without PowerShell), the dashboard automatically enters **Demo Mode** using the bundled mock data. A gold banner calls this out so you can confirm the mock pipeline is active.
3. Use the search box to filter by process, IP, country, or port and verify the summary cards update live.
4. Click **Refresh** to trigger the IPC reload and **Export**/**Copy** to confirm CSV/clipboard actions still work while in demo mode.

## Build

To build the Electron application:

```bash
npm run build
```

## Technologies Used

- **React** - UI framework
- **Electron** - Desktop application framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Vite** - Build tool

## Author

**Amila Prasad Perera**
