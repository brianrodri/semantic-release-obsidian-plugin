import { getPluginFiles } from "./constants.js";
import { readJSON, writeJSON } from "./json-io.js";

export async function prepare(_, context) {
    const version = context.nextRelease.version;
    const fileMap = await loadFileMap();
    const { minAppVersion } = fileMap.get("manifest.json");

    fileMap.forEach((json, file) => {
        switch (file) {
            case "versions.json":
                json[version] = minAppVersion;
                break;
            default:
                json.version = version;
                break;
        }
    });

    await saveFileMap(fileMap);
}

async function loadFileMap() {
    const entries = await Promise.all(getPluginFiles().map(async (path) => [path, await readJSON(path)]));

    return new Map(entries);
}

async function saveFileMap(fileMap) {
    const entries = [...fileMap.entries()];

    await Promise.all(entries.map(async ([path, json]) => await writeJSON(path, json)));
}
