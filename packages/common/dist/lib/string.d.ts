export declare function joinTitle(value: (string | undefined | null)[]): string;
export declare function joinedStringtoArray(value?: string | null, options?: {
    separator: string;
    defaultValue: string[];
}): string[];
export declare function escapePhoneNumber(value: string): string;
export declare function stripPhoneCountryCode(value: string): string;
export declare function toValidKoreanPhoneNumberOrNull(value: string): string | null;
export declare function maskingPhoneNumber(value: string): string;
export declare function getLastNumber(value: string): string;
export declare function numberWithCommas(value: number | string): string;
export declare function parseBoolean(value?: string | null): boolean;
export declare function parseNumber(value?: string | null): number;
export declare function formatNumberKR(num: number): string;
export declare function extractCleanAddress(address: string): {
    type: "road" | "jibun" | "unknown";
    address: string | null;
};
export declare function replaceSegment(value: string, index: number, newValue: string, delimiter?: string): string;
declare const _default: {
    joinTitle: typeof joinTitle;
    formatNumberKR: typeof formatNumberKR;
    joinedStringtoArray: typeof joinedStringtoArray;
    escapePhoneNumber: typeof escapePhoneNumber;
    stripPhoneCountryCode: typeof stripPhoneCountryCode;
    toValidKoreanPhoneNumberOrNull: typeof toValidKoreanPhoneNumberOrNull;
    maskingPhoneNumber: typeof maskingPhoneNumber;
    getLastNumber: typeof getLastNumber;
    numberWithCommas: typeof numberWithCommas;
    parseBoolean: typeof parseBoolean;
    parseNumber: typeof parseNumber;
    extractCleanAddress: typeof extractCleanAddress;
    replaceSegment: typeof replaceSegment;
};
export default _default;
//# sourceMappingURL=string.d.ts.map