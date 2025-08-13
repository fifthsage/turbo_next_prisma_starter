import dayjs, { OpUnitType, QUnitType } from "dayjs";
import "dayjs/locale/ko";
export { dayjs };
export declare function diff(value: Date, unit?: QUnitType | OpUnitType): number;
export declare function diffAfter(value: Date, target: number, unit?: QUnitType | OpUnitType): boolean;
export declare function diffWithin(value: Date, target: number, unit?: QUnitType | OpUnitType): boolean;
export declare function checkClosed(value: Date): boolean;
export declare function compareDateTime(compare: string | Date, target: string | Date, format?: string): boolean;
export declare const formatDuration: (seconds: number) => string;
//# sourceMappingURL=date.d.ts.map