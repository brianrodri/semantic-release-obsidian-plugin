import { readFile, writeFile } from "fs/promises";
import { getPluginFiles } from "./util.js";
import isPrerelease from "./is-prerelease.js";

export async function prepare(_, context) {
    const version = context.nextRelease.version;
    const fileMap = await loadFileMap();
    const { minAppVersion } = fileMap.get("manifest.json");

    // TODO(TfTHacker/obsidian42-brat#93): Remove if BRAT updates to GitHub release based workings
    // Pre-release, add `manifest-beta.json` key to filemap
    if (isPrerelease(context.branch)) {
        fileMap.set("manifest-beta.json", {
            ...fileMap.get("manifest.json"),
        });
    }

    fileMap.forEach((json, file) => {
        switch (file) {
            case "versions.json":
                json[version] = minAppVersion;
                break;
            case "manifest.json":
                // Don't touch manifest.json in case of pre-release
                if (!isPrerelease(context.branch)) {
                    json.version = version;
                }
                break;
            default:
                json.version = version;
                break;
        }
    });

    await saveFileMap(fileMap);
}

async function loadFileMap() {
    const entries = await Promise.all(getPluginFiles().map(async (file) => [file, JSON.parse(await readFile(file))]));

    return new Map(entries);
}

async function saveFileMap(fileMap) {
    const entries = [...fileMap.entries()];

    await Promise.all(entries.map(([file, json]) => writeFile(file, JSON.stringify(json, null, 4) + "\n")));
}
