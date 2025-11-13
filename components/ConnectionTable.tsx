
import React, { useState, useMemo } from 'react';
import type { ConnectionDetail } from '../types';
import { ChipIcon } from './icons/ChipIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { CountryBadge } from './CountryFlagSVG';

interface ConnectionTableProps {
    connections: ConnectionDetail[];
    isLoading: boolean;
    selectedCountry?: string | null;
}

interface GroupedConnections {
    [processName: string]: {
        processId: string;
        connections: ConnectionDetail[];
    };
}

const SkeletonProcess: React.FC = () => (
    <div className="animate-pulse border border-gray-700/50 rounded-lg p-4 mb-3">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </div>
);

const ConnectionTable: React.FC<ConnectionTableProps> = ({ connections, isLoading, selectedCountry }) => {
    const [expandedProcesses, setExpandedProcesses] = useState<Set<string>>(new Set());

    const groupedConnections = useMemo(() => {
        const grouped: GroupedConnections = {};
        connections.forEach((conn) => {
            if (!grouped[conn.processName]) {
                grouped[conn.processName] = {
                    processId: conn.processId,
                    connections: [],
                };
            }
            grouped[conn.processName].connections.push(conn);
        });
        return grouped;
    }, [connections]);

    const processes = useMemo(
        () => Object.entries(groupedConnections).sort((a, b) => b[1].connections.length - a[1].connections.length),
        [groupedConnections]
    );

    const toggleProcess = (processName: string) => {
        const newExpanded = new Set(expandedProcesses);
        if (newExpanded.has(processName)) {
            newExpanded.delete(processName);
        } else {
            newExpanded.add(processName);
        }
        setExpandedProcesses(newExpanded);
    };

    return (
        <section aria-labelledby="active-connections-title">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"></div>
                    <h2 id="active-connections-title" className="text-2xl font-bold text-gray-100">Active Connections</h2>
                    <span className="ml-auto text-sm font-semibold text-cyan-400">{connections.length} connections</span>
                </div>
                <p className="text-sm text-gray-400">Grouped by process with their remote connections</p>
            </div>

            <div className="space-y-3">
                {isLoading && processes.length === 0 ? (
                    [...Array(5)].map((_, i) => <SkeletonProcess key={i} />)
                ) : !isLoading && processes.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-12 text-center border border-gray-700/50">
                        <div className="flex flex-col items-center">
                            <ChipIcon className="w-12 h-12 mb-4 text-gray-600" />
                            <span className="font-semibold text-gray-300 text-lg">No active external connections</span>
                            <span className="text-sm text-gray-500 mt-2">Listening for network activity...</span>
                        </div>
                    </div>
                ) : (
                    processes.map(([processName, { processId, connections: processConnections }]) => (
                        <div
                            key={processName}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <button
                                onClick={() => toggleProcess(processName)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                                        <ChipIcon className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-gray-100 text-base">{processName}</div>
                                        <div className="text-xs text-gray-500 mt-1">PID: {processId} • {processConnections.length} connection{processConnections.length !== 1 ? 's' : ''}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                        {processConnections.length}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                                            expandedProcesses.has(processName) ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </button>

                            {expandedProcesses.has(processName) && (
                                <div className="border-t border-gray-700/50 bg-gray-900/50">
                                    <div className="px-4 py-3 space-y-2">
                                        {processConnections.map((conn, idx) => {
                                            const isMatched = selectedCountry && conn.country === selectedCountry;
                                            return (
                                                <div
                                                    key={`${processName}-${idx}`}
                                                    className={`flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-lg border transition-colors ${
                                                        isMatched 
                                                            ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                                                            : 'bg-gray-800/50 border-gray-700/30 hover:bg-gray-800/80'
                                                    }`}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300 font-mono">
                                                                {conn.remoteAddress}:{conn.remotePort}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <CountryBadge 
                                                                countryCode={conn.country} 
                                                                showName={true}
                                                                size="sm"
                                                                className="text-gray-400"
                                                            />
                                                            {conn.region && <span className="text-gray-600">• {conn.region}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:flex items-center text-xs text-gray-400 whitespace-nowrap">
                                                        <span className="px-2 py-1 rounded bg-gray-700/30 text-gray-300">{conn.remotePort}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ConnectionTable;