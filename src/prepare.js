import { readFile, writeFile } from "fs/promises";
import { getPluginFiles } from "./util";

export async function prepare(_, context) {
    const version = context.nextRelease.version;
    const fileMap = await loadFileMap();
    const { minAppVersion } = fileMap.get("manifest.json");

    fileMap.forEach((content, file) => {
        switch (file) {
            case "versions.json":
                content[version] = minAppVersion;
                break;
            default:
                content.version = version;
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

    await Promise.all(entries.map(([file, content]) => writeFile(file, JSON.stringify(content, null, 4) + "\n")));
}
