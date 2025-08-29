declare const BASE_KEY: {
    JOB_CHARGER_INFOMATION_SYNC: string;
    JOB_CHARGER_STATUS_SYNC: string;
    EV_CHARGER_STATUS: string;
};
export declare const CACHE_EXPIRATION: {
    NEXT_REVALIDATE: number;
    REDIS_TTL: number;
};
export declare const cacheKey: {
    redis: {
        charger: {
            status: (stationId: string) => string;
        };
    };
    next: {
        charger: {
            status: (stationId: string, chargerId: string) => string;
        };
    };
};
export default BASE_KEY;
//# sourceMappingURL=cache.d.ts.map