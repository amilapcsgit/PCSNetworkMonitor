import React from 'react';
import 'flag-icons/css/flag-icons.min.css';

interface FlagIconProps {
    countryCode: string;
    className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className = '' }) => {
    const code = countryCode?.toLowerCase() || 'unknown';
    return (
        <span
            className={`fi fi-${code} ${className}`}
            title={countryCode}
            style={{
                display: 'inline-block',
                lineHeight: '1em',
                fontSize: 'inherit'
            }}
        />
    );
};
