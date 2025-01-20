import AggregateError from "aggregate-error";
import { stat } from "fs/promises";
import { getPluginFiles } from "./constants.js";

export async function verifyConditions() {
    const outcomes = await Promise.allSettled(getPluginFiles().map(verifyIsFile));
    const errors = outcomes.filter((o) => o.status === "rejected").map((o) => o.reason);

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
}

async function verifyIsFile(file) {
    const fileStat = await stat(file);

    if (!fileStat.isFile()) {
        throw new Error(`Not a file: "${file}"`);
    }
}
