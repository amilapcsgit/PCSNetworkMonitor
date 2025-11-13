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

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npm run dev
   ```

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
