import { everyPromise } from "./every-promise.js";
import { getPluginFiles } from "./constants.js";
import { readJSON, writeJSON } from "./json-promises.js";

export async function prepare(_, context) {
    const version = context.nextRelease.version;
    const fileMap = await loadFileMap();
    const minAppVersion = fileMap.get("manifest.json")?.minAppVersion ?? "1.0.0";

    for (const [path, json] of fileMap) {
        switch (path) {
            case "package.json":
            case "package-lock.json":
            case "manifest.json":
                json.version = version;
                break;
            case "versions.json":
                json[version] = minAppVersion;
                break;
            default:
                throw new Error(`Unhandled file: ${path}`);
        }
    }

    await saveFileMap(fileMap);
}

async function loadFileMap() {
    const filePaths = getPluginFiles();
    const entries = await everyPromise(
        filePaths.map(async (path) => [path, await readJSON(path)]),
        `Failed to load ${filePaths.length} file(s): ${filePaths.join(", ")}`,
    );

    return new Map(entries);
}

async function saveFileMap(fileMap) {
    const filePaths = [...fileMap.keys()];
    const entries = [...fileMap.entries()];

    await everyPromise(
        entries.map(async ([path, json]) => await writeJSON(path, json)),
        `Failed to save ${filePaths.length} file(s): ${filePaths.join(", ")}`,
    );
}
