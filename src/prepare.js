import { readFile, writeFile } from "fs/promises";

export async function prepare(_, context) {
    const version = context.nextRelease.version;

    const [packageJson, packageLockJson, manifestJson, versionsJson] = await Promise.all([
        load("package.json"),
        load("package-lock.json"),
        load("manifest.json"),
        load("versions.json"),
    ]);

    packageJson.version = version;
    packageLockJson.version = version;
    manifestJson.version = version;
    versionsJson[version] = manifestJson.minAppVersion;

    await Promise.all([
        save("package.json", packageJson),
        save("package-lock.json", packageLockJson),
        save("manifest.json", manifestJson),
        save("versions.json", versionsJson),
    ]);
}

async function load(file) {
    return JSON.parse(await readFile(file));
}

async function save(file, content) {
    await writeFile(file, JSON.stringify(content, null, 4) + "\n");
}
