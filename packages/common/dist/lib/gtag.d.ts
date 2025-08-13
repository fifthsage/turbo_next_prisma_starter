export declare const GA_TRACKING_ID: string | undefined;
type GTagEvent = {
    category: string;
    label: string;
    value: number | string;
} & Record<string, unknown>;
export declare function pageview(url: string): void;
export declare function setUser(userId: string): void;
export declare function event(action: string, { category, label, value, ...rest }: GTagEvent): void;
export {};
//# sourceMappingURL=gtag.d.ts.map