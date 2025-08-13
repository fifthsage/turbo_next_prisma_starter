export function joinTitle(value) {
    const filtered = value.filter((v) => !!v);
    if (filtered.length > 1) {
        return `${filtered[0]} 외 ${value.length - 1}개`;
    }
    return filtered.pop() || "알 수 없음";
}
export function joinedStringtoArray(value = null, options = {
    separator: "|",
    defaultValue: [],
}) {
    if (!value) {
        return options.defaultValue;
    }
    return value.split(options.separator);
}
export function escapePhoneNumber(value) {
    return value.replace(/[^\d+]/g, "");
}
export function stripPhoneCountryCode(value) {
    return escapePhoneNumber(value).replace(/^\+?\d{1,4}/, "");
}
export function toValidKoreanPhoneNumberOrNull(value) {
    const escaped = escapePhoneNumber(value);
    if (escaped.startsWith("+82")) {
        return "0" + escaped.slice(3);
    }
    if (/^01[016789]\d{7,8}$/.test(escaped)) {
        return escaped;
    }
    return null;
}
export function maskingPhoneNumber(value) {
    return "*".repeat(value.length - 4) + value.slice(-4);
}
export function getLastNumber(value) {
    return value.substring(value.length - 4);
}
export function numberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function parseBoolean(value) {
    if (value === null) {
        return false;
    }
    if (value === undefined) {
        return false;
    }
    return /^true$/i.test(value);
}
export function parseNumber(value) {
    if (value === null) {
        return 0;
    }
    if (value === undefined) {
        return 0;
    }
    const parsed = parseFloat(value.replace(/,/g, ""));
    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
}
export function formatNumberKR(num) {
    if (num >= 10000000) {
        return `${(num / 10000000).toFixed(1).replace(/\.0$/, "")}천만`;
    }
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}백만`;
    }
    if (num >= 100000) {
        return `${(num / 10000).toFixed(1).replace(/\.0$/, "")}만`;
    }
    if (num >= 10000) {
        return `${(num / 10000).toFixed(1).replace(/\.0$/, "")}만`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}천`;
    }
    return num.toString();
}
export function extractCleanAddress(address) {
    const roadRegex = /^.+?(로|길|대로)\s?\d+(?:-\d+)?/;
    const jibunRegex = /^.+?(동|읍|면|리)\s?\d+(?:-\d+)?/;
    const roadMatch = address.match(roadRegex);
    if (roadMatch) {
        return {
            type: "road",
            address: roadMatch[0],
        };
    }
    const jibunMatch = address.match(jibunRegex);
    if (jibunMatch) {
        return {
            type: "jibun",
            address: jibunMatch[0],
        };
    }
    return {
        type: "unknown",
        address: null,
    };
}
export function replaceSegment(value, index, newValue, delimiter = ":") {
    const parts = value.split(delimiter);
    parts[index] = newValue;
    return parts.join(delimiter);
}
export default {
    joinTitle,
    formatNumberKR,
    joinedStringtoArray,
    escapePhoneNumber,
    stripPhoneCountryCode,
    toValidKoreanPhoneNumberOrNull,
    maskingPhoneNumber,
    getLastNumber,
    numberWithCommas,
    parseBoolean,
    parseNumber,
    extractCleanAddress,
    replaceSegment,
};
