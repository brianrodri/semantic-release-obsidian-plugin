import { readFile, writeFile } from "fs/promises";

/** Asynchronously reads a JSON file from the provided path and returns it as an object. */
export async function readJSON(path) {
    return JSON.parse(await readFile(path));
}

/** Asynchronously writes the provided JSON object to a file with the provided path. */
export async function writeJSON(path, json) {
    await writeFile(path, JSON.stringify(json, null, 4) + "\n");
}
