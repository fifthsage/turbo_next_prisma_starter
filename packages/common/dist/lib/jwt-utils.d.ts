declare function sign(id: string): Promise<string>;
declare function verify(token: string): Promise<string>;
declare function refresh(id: string): Promise<string>;
declare function refreshVerify(token: string): Promise<string | false>;
export { sign, verify, refresh, refreshVerify };
//# sourceMappingURL=jwt-utils.d.ts.map