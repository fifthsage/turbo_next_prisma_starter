/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { stringify } from "qs";
export function getStaticPath(bucket, path = null, qs) {
    const basePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
    if (qs) {
        `${basePath}?${stringify(qs)}`;
    }
    return basePath;
}
