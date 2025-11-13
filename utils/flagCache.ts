const CACHE_KEY_PREFIX = 'flag_cache_';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
    dataUrl: string;
    timestamp: number;
}

export const getFlagUrl = (countryCode: string): string => {
    const code = countryCode?.toLowerCase() || 'xx';
    return `https://flagcdn.com/16x12/${code}.png`;
};

export const getCachedFlag = (countryCode: string): string | null => {
    try {
        const cacheKey = `${CACHE_KEY_PREFIX}${countryCode.toLowerCase()}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            if (Date.now() - entry.timestamp < CACHE_EXPIRY) {
                return entry.dataUrl;
            }
            localStorage.removeItem(cacheKey);
        }
    } catch (error) {
        console.error('Error reading flag cache:', error);
    }
    return null;
};

export const cacheFlag = (countryCode: string, dataUrl: string): void => {
    try {
        const cacheKey = `${CACHE_KEY_PREFIX}${countryCode.toLowerCase()}`;
        const entry: CacheEntry = {
            dataUrl,
            timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (error) {
        console.error('Error caching flag:', error);
    }
};

export const fetchAndCacheFlag = async (countryCode: string): Promise<string | null> => {
    // Check cache first
    const cached = getCachedFlag(countryCode);
    if (cached) return cached;

    try {
        const url = getFlagUrl(countryCode);
        const response = await fetch(url, { timeout: 5000 });
        
        if (!response.ok) return null;
        
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                cacheFlag(countryCode, dataUrl);
                resolve(dataUrl);
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching flag:', error);
        return null;
    }
};
