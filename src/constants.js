/** Returns the list of files the plugin expects to read to/write from. */
export function getPluginFiles() {
    return ["package.json", "package-lock.json", "manifest.json", "versions.json"];
}
