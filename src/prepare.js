import { allWithAggregateErrors } from "./all-with-aggregate-errors.js";
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
    const filePaths = getPluginFiles();
    const entries = await allWithAggregateErrors(
        filePaths.map(async (path) => [path, await readJSON(path)]),
        `Failed to load ${filePaths.length} file(s): ${filePaths.join("\n")}`,
    );

    return new Map(entries);
}

async function saveFileMap(fileMap) {
    const filePaths = [...fileMap.keys()];
    const entries = [...fileMap.entries()];

    await allWithAggregateErrors(
        entries.map(async ([path, json]) => await writeJSON(path, json)),
        `Failed to save ${filePaths.length} file(s): ${filePaths.join(", ")}`,
    );
}
