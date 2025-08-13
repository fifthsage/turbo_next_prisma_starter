import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
export function generateFileName(file) {
    const ext = file.name.split(".").pop();
    return `${uuidv4()}.${ext}`;
}
export async function processFile(file) {
    if (file.type.startsWith("image/")) {
        return sharp(await file.arrayBuffer())
            .resize({
            width: 640,
        })
            .jpeg()
            .toBuffer();
    }
    return file;
}
