
import React, { useState, useEffect, useCallback } from 'react';
import type { ConnectionDetail } from './types';
import Header from './components/Header';
import ConnectionTable from './components/ConnectionTable';
import TrafficChart from './components/TrafficChart';

const REFRESH_INTERVAL_MS = 10000; // Corresponds to interval in electron.ts

const App: React.FC = () => {
    const [connections, setConnections] = useState<ConnectionDetail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const filteredConnections = selectedCountry
        ? connections.filter(conn => conn.country === selectedCountry)
        : connections;

    const manualRefresh = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const handleExportData = useCallback(() => {
        const data = filteredConnections.map(conn => ({
            process: conn.processName,
            pid: conn.processId,
            remoteAddress: conn.remoteAddress,
            remotePort: conn.remotePort,
            country: conn.country,
            region: conn.region,
        }));
        const csv = [
            ['Process', 'PID', 'Remote Address', 'Port', 'Country', 'Region'],
            ...data.map(d => [d.process, d.pid, d.remoteAddress, d.remotePort, d.country, d.region])
        ]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `network-connections-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }, [filteredConnections]);

    const handleCopyData = useCallback(() => {
        const text = filteredConnections
            .map(conn => `${conn.processName} (${conn.processId}) -> ${conn.remoteAddress}:${conn.remotePort} (${conn.country})`)
            .join('\n');
        navigator.clipboard.writeText(text);
    }, [filteredConnections]);

    useEffect(() => {
        const handleConnectionUpdate = (data: ConnectionDetail[]) => {
            // Sort by process name for consistent display
            const sortedData = data.sort((a, b) => a.processName.localeCompare(b.processName));
            setConnections(sortedData);
            setLastUpdated(new Date());
            setError(null);
            setIsLoading(false);
        };

        const handleConnectionError = (errorMessage: string) => {
            console.error("Backend error:", errorMessage);
            setError(`Failed to get network data. Details: ${errorMessage}`);
            setIsLoading(false);
        };

        // Set up listeners
        window.electronAPI.onConnectionUpdate(handleConnectionUpdate);
        window.electronAPI.onConnectionError(handleConnectionError);

        // Clean up listeners on component unmount
        return () => {
            window.electronAPI.removeAllListeners();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 font-sans">
            <div className="container mx-auto p-4 md:p-8 max-w-screen-2xl">
                <Header 
                    onRefresh={manualRefresh}
                    lastUpdated={lastUpdated} 
                    isLoading={isLoading} 
                />
                <main className="mt-10 space-y-6">
                    {error && (
                        <div className="bg-gradient-to-r from-red-950 to-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-xl relative shadow-lg backdrop-blur-sm" role="alert">
                            <strong className="font-bold block mb-1">⚠️ Error</strong>
                            <span className="block text-sm">{error}</span>
                        </div>
                    )}
                    
                    <div className="flex gap-3 flex-wrap items-center">
                        {selectedCountry && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg">
                                <span className="text-sm text-cyan-300 font-semibold">Filtering: {selectedCountry}</span>
                                <button
                                    onClick={() => setSelectedCountry(null)}
                                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleExportData}
                            className="px-4 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/40 border border-green-600/50 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
                            title="Export current data to CSV"
                        >
                            📥 Export CSV
                        </button>
                        <button
                            onClick={handleCopyData}
                            className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-600/50 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                            title="Copy data to clipboard"
                        >
                            📋 Copy
                        </button>
                        <button
                            onClick={() => setSelectedCountry(null)}
                            className="px-4 py-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-gray-200 text-sm font-semibold transition-colors"
                            title="Clear filters"
                        >
                            🔄 Clear Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max lg:auto-rows-max">
                        <div className="lg:col-span-2">
                            <ConnectionTable 
                                connections={filteredConnections} 
                                isLoading={isLoading}
                                selectedCountry={selectedCountry}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <TrafficChart 
                                connections={connections} 
                                isLoading={isLoading}
                                selectedCountry={selectedCountry}
                                onCountrySelect={setSelectedCountry}
                            />
                        </div>
                    </div>
                </main>
                <footer className="text-center mt-16 text-gray-500 text-xs tracking-wide">
                    <p className="mb-2">Network Monitor • Real-time Analysis</p>
                    <p>Auto-refresh: <span className="text-cyan-400 font-semibold">{REFRESH_INTERVAL_MS / 1000}s</span></p>
                </footer>
            </div>
        </div>
    );
};

export default App;