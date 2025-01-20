import { stat } from "fs/promises";
import { getPluginFiles } from "./constants.js";
import { allWithAggregateErrors } from "./all-with-aggregate-errors.js";

export async function verifyConditions() {
    const filePaths = getPluginFiles();
    await allWithAggregateErrors(
        filePaths.map(verifyIsFile),
        `Failed to verify ${filePaths.length} file(s): ${filePaths.join(", ")}`,
    );
}

async function verifyIsFile(file) {
    const fileStat = await stat(file);
    if (!fileStat.isFile()) {
        throw new Error(`Not a file: "${file}"`);
    }
}
