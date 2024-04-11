import AggregateError from "aggregate-error";
import { stat } from "fs/promises";

const FILES = ["package.json", "package-lock.json", "manifest.json", "versions.json"];

export async function verifyConditions() {
    const outcomes = await Promise.allSettled(FILES.map(verifyFile));
    const errors = outcomes.filter((o) => o.status === "rejected").map((o) => o.reason);

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
}

async function verifyFile(file) {
    if ((await stat(file)).isFile()) {
        return;
    }
    throw new Error(`Not a file: "${file}"`);
}
