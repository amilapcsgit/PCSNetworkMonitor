
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ConnectionDetail } from './types';
import Header from './components/Header';
import ConnectionTable from './components/ConnectionTable';
import TrafficChart from './components/TrafficChart';
import { CountryBadge } from './components/CountryFlagSVG';
import { MOCK_CONNECTIONS } from './utils/mockConnections';

const REFRESH_INTERVAL_MS = 10000; // Corresponds to interval in electron.ts

const App: React.FC = () => {
    const [connections, setConnections] = useState<ConnectionDetail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

    const hasElectronBridge = typeof window !== 'undefined' && Boolean(window.electronAPI);

    const applyConnectionUpdate = useCallback((data: ConnectionDetail[]) => {
        const sortedData = [...data].sort((a, b) => a.processName.localeCompare(b.processName));
        setConnections(sortedData);
        setLastUpdated(new Date());
        setError(null);
        setIsLoading(false);
    }, []);

    const filteredConnections = useMemo(() => {
        let data = selectedCountry
            ? connections.filter(conn => conn.country === selectedCountry)
            : connections;

        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            data = data.filter(conn => {
                const connectionTarget = `${conn.remoteAddress}:${conn.remotePort}`.toLowerCase();
                return (
                    conn.processName.toLowerCase().includes(query) ||
                    connectionTarget.includes(query) ||
                    conn.region?.toLowerCase().includes(query) ||
                    conn.country?.toLowerCase().includes(query)
                );
            });
        }

        return data;
    }, [connections, selectedCountry, searchQuery]);

    const summaryStats = useMemo(() => {
        const totalConnections = connections.length;
        const uniqueProcesses = new Set(connections.map(conn => conn.processName)).size;
        const uniqueCountries = new Set(connections.map(conn => conn.country)).size;

        const countryCounts = connections.reduce((acc, conn) => {
            const code = conn.country || 'Unknown';
            acc[code] = (acc[code] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);
        const topCountry = sortedCountries.length ? { code: sortedCountries[0][0], count: sortedCountries[0][1] } : null;

        return {
            totalConnections,
            uniqueProcesses,
            uniqueCountries,
            topCountry,
        };
    }, [connections]);

    const filtersActive = Boolean(selectedCountry || searchQuery.trim());

    const manualRefresh = useCallback(() => {
        setIsLoading(true);
        setError(null);

        if (hasElectronBridge) {
            window.electronAPI?.requestRefresh();
            return;
        }

        setIsDemoMode(true);
        setTimeout(() => {
            applyConnectionUpdate(MOCK_CONNECTIONS);
        }, 300);
    }, [applyConnectionUpdate, hasElectronBridge]);

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
        if (!hasElectronBridge) {
            setIsDemoMode(true);
            const timer = setTimeout(() => {
                applyConnectionUpdate(MOCK_CONNECTIONS);
            }, 300);
            return () => clearTimeout(timer);
        }

        const handleConnectionUpdate = (data: ConnectionDetail[]) => {
            setIsDemoMode(false);
            applyConnectionUpdate(data);
        };

        const handleConnectionError = (errorMessage: string) => {
            console.error("Backend error:", errorMessage);
            setError(`Failed to get network data. Details: ${errorMessage}`);
            setIsLoading(false);
        };

        // Set up listeners
        window.electronAPI?.onConnectionUpdate(handleConnectionUpdate);
        window.electronAPI?.onConnectionError(handleConnectionError);

        // Clean up listeners on component unmount
        return () => {
            window.electronAPI?.removeAllListeners();
        };
    }, [applyConnectionUpdate, hasElectronBridge]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 font-sans">
            <div className="container mx-auto p-4 md:p-8 max-w-screen-2xl">
                <Header 
                    onRefresh={manualRefresh}
                    lastUpdated={lastUpdated} 
                    isLoading={isLoading} 
                />
                <main className="mt-10 space-y-6">
                    {isDemoMode && (
                        <div className="bg-gradient-to-r from-cyan-950 to-slate-900 border border-cyan-700/60 text-cyan-100 px-6 py-4 rounded-xl relative shadow-lg backdrop-blur-sm" role="status">
                            <strong className="font-bold block mb-1">Demo data active</strong>
                            <span className="block text-sm">The PowerShell collector isn't available, so you're viewing rich sample data.</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-gradient-to-r from-red-950 to-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-xl relative shadow-lg backdrop-blur-sm" role="alert">
                            <strong className="font-bold block mb-1">⚠️ Error</strong>
                            <span className="block text-sm">{error}</span>
                        </div>
                    )}

                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <article className="rounded-2xl bg-gradient-to-br from-slate-800/70 to-gray-900/70 border border-gray-700/50 p-4 shadow-xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Connections</p>
                            <p className="text-3xl font-semibold text-white mt-2">{summaryStats.totalConnections.toLocaleString()}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {filtersActive
                                    ? `${filteredConnections.length.toLocaleString()} shown after filters`
                                    : 'All connections visible'}
                            </p>
                        </article>
                        <article className="rounded-2xl bg-gradient-to-br from-slate-800/70 to-gray-900/70 border border-gray-700/50 p-4 shadow-xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Processes</p>
                            <p className="text-3xl font-semibold text-white mt-2">{summaryStats.uniqueProcesses.toLocaleString()}</p>
                            <p className="text-sm text-gray-400 mt-1">Grouped automatically in the table</p>
                        </article>
                        <article className="rounded-2xl bg-gradient-to-br from-slate-800/70 to-gray-900/70 border border-gray-700/50 p-4 shadow-xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Countries</p>
                            <p className="text-3xl font-semibold text-white mt-2">{summaryStats.uniqueCountries.toLocaleString()}</p>
                            <p className="text-sm text-gray-400 mt-1">Detected from remote endpoints</p>
                        </article>
                        <article className="rounded-2xl bg-gradient-to-br from-slate-800/70 to-gray-900/70 border border-gray-700/50 p-4 shadow-xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Top Destination</p>
                            {summaryStats.topCountry ? (
                                <div className="mt-3 flex items-center justify-between">
                                    <CountryBadge countryCode={summaryStats.topCountry.code} showName={true} size="md" className="text-gray-100" />
                                    <span className="text-sm text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1">
                                        {summaryStats.topCountry.count} connections
                                    </span>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 mt-2">No country data yet</p>
                            )}
                        </article>
                    </section>

                    <div className="flex gap-3 flex-wrap items-center">
                        <div className="relative flex-1 min-w-[240px] max-w-xl">
                            <span className="absolute left-3 top-3 text-gray-500">🔍</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search process, host, port or region..."
                                className="w-full bg-gray-900/40 border border-gray-700/60 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-transparent"
                                aria-label="Search connections"
                            />
                        </div>
                        {selectedCountry && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg">
                                <span className="text-sm text-cyan-300 font-semibold flex items-center gap-1.5">
                                    <span>Filtering:</span>
                                    <CountryBadge countryCode={selectedCountry} showName={true} size="md" />
                                </span>
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