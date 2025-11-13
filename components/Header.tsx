
import React from 'react';
import { RefreshIcon } from './icons/RefreshIcon';

interface HeaderProps {
    onRefresh: () => void;
    lastUpdated: Date | null;
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, lastUpdated, isLoading }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 pb-8 border-b border-gray-800/50">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"></div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                        Network Monitor
                    </h1>
                </div>
                <p className="text-gray-400 mt-2 text-sm md:text-base">
                    Real-time visualization of your PC's network connections
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Status</div>
                    <div className="text-sm text-gray-300 font-semibold mt-1 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                        {isLoading 
                            ? 'Scanning...' 
                            : lastUpdated 
                            ? `${lastUpdated.toLocaleTimeString()}`
                            : 'Initializing...'}
                    </div>
                </div>
                <button
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-cyan-700 text-gray-200 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/20"
                    aria-label="Refresh connections"
                >
                    <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin-slow' : ''}`} />
                </button>
            </div>
        </header>
    );
};

export default Header;
