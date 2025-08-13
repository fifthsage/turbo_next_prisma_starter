import { EvChargerAPIParameters, EvChargerAPIResponse, EvChargerGetChargerInfoItem, EvChargerGetChargerStatusItem } from "../../../types";
export declare function getChargerInfo(params: EvChargerAPIParameters): Promise<EvChargerAPIResponse<EvChargerGetChargerInfoItem>>;
export declare function getChargerStatus(params: EvChargerAPIParameters): Promise<EvChargerAPIResponse<EvChargerGetChargerStatusItem>>;
export declare function mapChargerInfo(item?: EvChargerGetChargerInfoItem | null): {
    stationId: string | undefined;
    stationName: string | undefined;
    chargerId: string | undefined;
    chargerType: string | undefined;
    operatorOrg: string | undefined;
    operatorId: string | undefined;
    operatorContact: string | undefined;
    facilityCategory: string | null;
    facilitySubcategory: string | null;
    roadAddress: string | undefined;
    locationDetail: string | undefined;
    latitude: number | null;
    longitude: number | null;
    availableHours: string | undefined;
    chargingCapacityKw: string | null;
    chargingMethod: string | null;
    chargerStatus: string | undefined;
    statusUpdatedAt: string | null;
    lastStartedAt: string | null;
    lastEndedAt: string | null;
    nowStartedAt: string | null;
    parkingFree: "Y" | "N" | null;
    userRestriction: "Y" | "N" | undefined;
    restrictionDetail: string | null;
    note: string | null;
    deleted: "Y" | "N" | undefined;
    deleteReason: string | null;
    trafficSupport: "Y" | "N" | undefined;
    installedYear: string | undefined;
    deletedAt: Date | null;
};
export declare function mapChargerStatus(item?: EvChargerGetChargerStatusItem | null): {
    status: string;
    statusUpdatedAt: string;
    lastStartedAt: string;
    lastEndedAt: string;
    nowStartedAt: string;
    fetchedAt: string;
    source: string;
};
declare const _default: {
    getChargerInfo: typeof getChargerInfo;
    getChargerStatus: typeof getChargerStatus;
    mapper: {
        mapChargerInfo: typeof mapChargerInfo;
        mapChargerStatus: typeof mapChargerStatus;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map