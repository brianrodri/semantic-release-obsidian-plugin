import { readFile, writeFile } from "fs/promises";

export async function readJSON(path) {
    return JSON.parse(await readFile(path));
}

export async function writeJSON(path, json) {
    await writeFile(path, JSON.stringify(json, null, 4) + "\n");
}
