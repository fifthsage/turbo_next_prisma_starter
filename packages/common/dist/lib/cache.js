const JOB_CHARGER_INFOMATION_SYNC = "j:ci";
const JOB_CHARGER_STATUS_SYNC = "j:cs";
const EV_CHARGER_STATUS = "ev:cs";
const BASE_KEY = {
    JOB_CHARGER_INFOMATION_SYNC,
    JOB_CHARGER_STATUS_SYNC,
    EV_CHARGER_STATUS,
};
export const CACHE_EXPIRATION = {
    NEXT_REVALIDATE: 10, // 10 seconds
    REDIS_TTL: 60, // 1 minute
};
export const cacheKey = {
    redis: {
        charger: {
            status: (stationId) => `${EV_CHARGER_STATUS}:${stationId}`,
        },
    },
    next: {
        charger: {
            status: (stationId, chargerId) => `${EV_CHARGER_STATUS}:${stationId}:${chargerId}`,
        },
    },
};
export default BASE_KEY;
