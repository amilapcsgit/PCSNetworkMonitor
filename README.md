# PCS Network Monitor

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

## Update Overview
This update introduces enhanced country flag visualization, data filtering capabilities, and improved UI with a focus on offline functionality and better data presentation.

Key Changes
1. Embedded SVG Country Flags with Emoji Fallback
Replaced external API calls with embedded SVG definitions for 37+ countries
Supports: US, IT, IE, FR, GB, DE, ES, NL, BE, SE, NO, DK, FI, PL, RU, CN, JP, IN, AU, CA, MX, BR, ZA, CH, AT, CZ, GR, PT, NZ, SG, HK, KR, TH, VN, TR, SA, IL, AE
Graceful emoji fallback for countries without SVG definitions
Fully offline-capable flag rendering
2. Data Filtering & Export
Country-based filtering of network connections
CSV export functionality for filtered data
Clipboard copy feature for quick data sharing
Visual filter indicator in the UI
3. UI/UX Enhancements
Gradient backgrounds and improved visual hierarchy
Interactive bar chart with country selection capability
Enhanced header design with animated status indicator and gradient text
Improved chart tooltips with custom styling
Better responsive layout with improved spacing
4. Technical Improvements
Fixed Electron imports (namespace to named imports)
Improved script path detection for packaged applications
Enhanced error handling for missing PowerShell scripts
Switched build target from NSIS to portable executable
## Benefits
- ✅ Offline-first: No external API calls required
- ✅ Performance: Self-contained rendering, no caching layer needed
- ✅ Reliability: Full country coverage with emoji fallback
- ✅ UX: Improved data visualization and filtering capabilities
- ✅ Compatibility: Better Electron integration
