export const cacheKey = {
    redis: {
        charger: {
            status: (stationId, chargerId) => `cache:ev-charger:status:${stationId}:${chargerId}`,
        },
    },
    next: {
        charger: {
            status: (stationId, chargerId) => `ev-charger:status:${stationId}:${chargerId}`,
        },
    },
};
export const CACHE_EXPIRATION = {
    NEXT_REVALIDATE: 10, // 10 seconds
    REDIS_TTL: 60, // 1 minute
};
