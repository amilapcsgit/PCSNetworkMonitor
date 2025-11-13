
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import type { ConnectionDetail } from '../types';
import { GlobeIcon } from './icons/GlobeIcon';

interface TrafficChartProps {
    connections: ConnectionDetail[];
    isLoading: boolean;
    selectedCountry?: string | null;
    onCountrySelect?: (country: string | null) => void;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ connections, isLoading, selectedCountry, onCountrySelect }) => {
    const data = useMemo(() => {
        if (!connections || connections.length === 0) {
            return [];
        }

        const countsByCountry: { [key: string]: number } = connections.reduce((acc, conn) => {
            const country = conn.country || 'Unknown';
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(countsByCountry)
            .map(([country, connections]) => ({ country, connections, isSelected: country === selectedCountry }))
            .sort((a, b) => b.connections - a.connections);

    }, [connections, selectedCountry]);

    const handleBarClick = (data: any) => {
        if (onCountrySelect) {
            onCountrySelect(selectedCountry === data.country ? null : data.country);
        }
    };

    return (
        <section aria-labelledby="traffic-chart-title">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                    <h2 id="traffic-chart-title" className="text-2xl font-bold text-gray-100">Connections by Country</h2>
                    <span className="ml-auto text-sm font-semibold text-blue-400">{data.length} countries</span>
                </div>
                <p className="text-sm text-gray-400">Distribution of network connections by geographic location</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 md:p-8 border border-gray-700/50">
                <div className="w-full h-[350px]">
                    {(isLoading && data.length === 0) ? (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/30 rounded-lg animate-pulse" />
                    ) : data.length === 0 ? (
                        <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                             <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 border border-blue-500/30">
                                <GlobeIcon className="w-6 h-6 text-blue-400" />
                             </div>
                             <span className="font-semibold text-gray-300">No data to visualize</span>
                             <span className="text-xs mt-1">Waiting for connections...</span>
                        </div>
                    ) : (
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 10, right: 20, left: -5, bottom: 10 }} onClick={(state: any) => {
                                if (state && state.activeTooltipIndex !== undefined) {
                                    handleBarClick(data[state.activeTooltipIndex]);
                                }
                            }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444444" opacity={0.3} />
                                <XAxis dataKey="country" stroke="#888888" tick={{ fontSize: 12, fill: '#a0a0a0' }} />
                                <YAxis stroke="#888888" tick={{ fontSize: 12, fill: '#a0a0a0' }} allowDecimals={false} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }}
                                    contentStyle={{ 
                                        backgroundColor: '#1a1a2e', 
                                        border: '1px solid #22d3ee',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 10px 25px rgba(34, 211, 238, 0.2)'
                                    }} 
                                    labelStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                                    wrapperStyle={{ outline: 'none' }}
                                    content={({ active, payload }: any) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-gray-900 border border-cyan-400 rounded-lg p-2 text-xs text-white">
                                                    <p className="font-semibold text-cyan-300">{payload[0].payload.country}</p>
                                                    <p className="text-gray-300">{payload[0].value} connections</p>
                                                    <p className="text-gray-500 text-xs mt-1">Click to filter</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar 
                                    dataKey="connections" 
                                    fill="#22d3ee" 
                                    radius={[8, 8, 0, 0]} 
                                    name="Connections" 
                                    isAnimationActive={true}
                                    onClick={(data: any) => handleBarClick(data)}
                                    style={{ cursor: 'pointer' }}
                                    shape={({ x, y, width, height, payload }: any) => {
                                        const isSelected = payload.isSelected;
                                        const fillColor = isSelected ? '#06b6d4' : '#22d3ee';
                                        const opacity = isSelected ? 1 : 0.7;
                                        return (
                                            <rect
                                                x={x}
                                                y={y}
                                                width={width}
                                                height={height}
                                                fill={fillColor}
                                                opacity={opacity}
                                                rx={8}
                                                style={{ 
                                                    filter: isSelected ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'none',
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TrafficChart;