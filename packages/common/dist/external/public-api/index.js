import { stringify } from "qs";
import { CHARGER_STATUS } from "../../lib";
export async function getChargerInfo(params) {
    const response = await fetch(`https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?${stringify({
        ...params,
        dataType: "JSON",
        serviceKey: process.env.K_PUBLIC_OPEN_API_KEY,
    })}`);
    const result = (await response.json());
    if (result.resultCode !== "00") {
        throw new Error(`API Error: ${result.resultMsg} (${result.resultCode})`);
    }
    return result;
}
export async function getChargerStatus(params) {
    const response = await fetch(`https://apis.data.go.kr/B552584/EvCharger/getChargerStatus?${stringify({
        ...params,
        dataType: "JSON",
        serviceKey: process.env.K_PUBLIC_OPEN_API_KEY,
    })}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch charger status: ${response.statusText}`);
    }
    const result = (await response.json());
    if (result.resultCode !== "00") {
        throw new Error(`API Error: ${result.resultMsg} (${result.resultCode})`);
    }
    return result;
}
export function mapChargerInfo(item) {
    return {
        stationId: item?.statId,
        stationName: item?.statNm,
        chargerId: item?.chgerId,
        chargerType: item?.chgerType,
        operatorOrg: item?.bnm,
        operatorId: item?.busiId,
        operatorContact: item?.busiCall,
        facilityCategory: item?.kind ?? null,
        facilitySubcategory: item?.kindDetail ?? null,
        roadAddress: item?.addr,
        locationDetail: item?.addrDetail,
        latitude: item ? parseFloat(item.lat) : null,
        longitude: item ? parseFloat(item.lng) : null,
        availableHours: item?.useTime,
        chargingCapacityKw: item?.output ?? null,
        chargingMethod: item?.method ?? null,
        chargerStatus: item?.stat,
        statusUpdatedAt: item?.statUpdDt ?? null,
        lastStartedAt: item?.lastTsdt ?? null,
        lastEndedAt: item?.lastTedt ?? null,
        nowStartedAt: item?.nowTsdt ?? null,
        parkingFree: item?.parkingFree ?? null,
        userRestriction: item?.limitYn,
        restrictionDetail: item?.limitDetail ?? null,
        note: item?.note ?? null,
        deleted: item?.delYn,
        deleteReason: item?.delDetail ?? null,
        trafficSupport: item?.trafficYn,
        installedYear: item?.year,
        deletedAt: item?.delYn === "Y" ? new Date() : null,
    };
}
export function mapChargerStatus(item) {
    return {
        status: item?.stat || CHARGER_STATUS.UNKNOWN,
        statusUpdatedAt: item?.statUpdDt || "",
        lastStartedAt: item?.lastTsdt || "",
        lastEndedAt: item?.lastTedt || "",
        nowStartedAt: item?.nowTsdt || "",
        fetchedAt: new Date().toISOString(),
        source: "public-api",
    };
}
export default {
    getChargerInfo,
    getChargerStatus,
    mapper: {
        mapChargerInfo,
        mapChargerStatus,
    },
};
