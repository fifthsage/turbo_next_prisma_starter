export declare const cacheKey: {
    redis: {
        charger: {
            status: (stationId: string, chargerId: string) => string;
        };
    };
    next: {
        charger: {
            status: (stationId: string, chargerId: string) => string;
        };
    };
};
export declare const CACHE_EXPIRATION: {
    NEXT_REVALIDATE: number;
    REDIS_TTL: number;
};
//# sourceMappingURL=cache.d.ts.map